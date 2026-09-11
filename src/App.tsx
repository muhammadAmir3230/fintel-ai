import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CopilotDrawer } from './components/CopilotDrawer';
import { DashboardView } from './components/DashboardView';
import { TransactionsView } from './components/TransactionsView';
import { InvoicesView } from './components/InvoicesView';
import { TaxView } from './components/TaxView';
import { ExpensesView } from './components/ExpensesView';
import { BankCashView } from './components/BankCashView';
import { CustomersView } from './components/CustomersView';
import { SuppliersView } from './components/SuppliersView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { OnboardingModal } from './components/OnboardingModal';
import { CreateInvoiceModal } from './components/CreateInvoiceModal';
import { DraftReminderModal } from './components/DraftReminderModal';
import { SSTFilingModal } from './components/SSTFilingModal';
import { ReceiptScanModal } from './components/ReceiptScanModal';
import { HelpModal } from './components/HelpModal';
import { getOrCreateBusiness, saveBusiness } from './lib/bizService';
import { getInvoices, createInvoice, updateInvoiceStatus, deleteInvoice } from './lib/invoiceService';
import { getTransactions, createTransaction, resolveFlagged } from './lib/txService';

import {
  TabType, Invoice, Transaction, ChecklistItem, BusinessProfile, SSTFiling
} from './types';
import {
  initialBusinessProfile, initialChecklist, sstFilingsHistory
} from './data/mockData';

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [copilotOpen, setCopilotOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);
  const [searchTerm, setSearchTerm] = useState('');

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(initialBusinessProfile);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getOrCreateBusiness().then((p) => {
      if (p) {
        setBusinessProfile(p);
        if (p.name === 'My Business' || p.name.endsWith("'s Business")) {
          setNeedsSetup(true);
        }
      }
      getInvoices().then(setInvoices);
      getTransactions().then(setTransactions);
    });
  }, []);

  const handleSaveProfile = (p: BusinessProfile) => {
    setBusinessProfile(p);
    saveBusiness(p);
  };

  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filings, setFilings] = useState<SSTFiling[]>(sstFilingsHistory);

  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDraftReminderOpen, setIsDraftReminderOpen] = useState(false);
  const [selectedReminderInvoiceId, setSelectedReminderInvoiceId] = useState<string | null>(null);
  const [isSSTFilingOpen, setIsSSTFilingOpen] = useState(false);
  const [isReceiptScanOpen, setIsReceiptScanOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);


  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

    const handleAddTransaction = async (newTx: Omit<Transaction, 'id'>) => {
    const created = await createTransaction(newTx);
    if (created) {
      setTransactions((prev) => [created, ...prev]);
      showToast(`Recorded "${newTx.description}" for RM ${newTx.amount.toFixed(2)}.`);
    } else {
      showToast('Could not save transaction.');
    }
  };

    const handleResolveFlagged = async (id: string) => {
    await resolveFlagged(id);
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, status: 'completed', flagReason: undefined } : tx)));
    showToast('Transaction verified and unflagged.');
  };

  // ---- invoices now save to Supabase ----
  const handleSaveInvoice = async (newInv: Invoice) => {
    const saved = await createInvoice(newInv);
    if (saved) {
      setInvoices((prev) => [saved, ...prev]);
      showToast(`Created Invoice ${saved.invoiceNumber} for ${saved.customerName}.`);
    } else {
      showToast('Could not save invoice. Please try again.');
    }
  };

  const handleUpdateInvoiceStatus = async (id: string, status: Invoice['status']) => {
    await updateInvoiceStatus(id, status);
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status } : inv)));
    showToast(`Invoice status updated to ${status.toUpperCase()}.`);
  };

  const handleDeleteInvoice = async (id: string) => {
    await deleteInvoice(id);
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    showToast('Invoice deleted.');
  };

  const handleOpenDraftReminder = (invoiceId: string) => {
    setSelectedReminderInvoiceId(invoiceId);
    setIsDraftReminderOpen(true);
  };

  const handleReminderSentSuccess = (invoiceId: string) => showToast('Payment reminder email dispatched.');

  const handleFilingSubmitted = (newFiling: SSTFiling) => {
    setFilings((prev) => [newFiling, ...prev]);
    showToast('Form SST-02 Return successfully submitted to Customs.');
  };

  const selectedReminderInvoice = invoices.find((i) => i.id === selectedReminderInvoiceId) || invoices[0] || null;
  const nextInvoiceNumber = `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`;

  if (needsSetup) {
    return (
      <div className="min-h-screen bg-[#f8f9ff]">
        <OnboardingModal
          isOpen={true}
          onClose={() => setNeedsSetup(false)}
          businessProfile={businessProfile}
          onSaveProfile={(p) => { handleSaveProfile(p); setNeedsSetup(false); }}
        />
      </div>
    );
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 flex relative selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[130px]" />
        <div className="absolute top-[30%] -right-[15%] w-[650px] h-[650px] rounded-full bg-emerald-600/10 blur-[140px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        businessProfile={businessProfile}
        onOpenNewInvoice={() => setIsNewInvoiceOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      <div className="flex-1 flex flex-col pl-[280px] min-w-0 transition-all relative z-10">
        <Header
          businessProfile={businessProfile}
          onUpdateBusinessName={(name) => handleSaveProfile({ ...businessProfile, name })}
          copilotOpen={copilotOpen}
          onToggleCopilot={() => setCopilotOpen(!copilotOpen)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        <main className={`flex-1 p-6 md:p-8 transition-all ${copilotOpen ? 'pr-[340px] xl:pr-[360px]' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardView
                onNavigateTab={setCurrentTab}
                onOpenNewInvoice={() => setIsNewInvoiceOpen(true)}
                onOpenReceiptScan={() => setIsReceiptScanOpen(true)}
                invoices={invoices}
                transactions={transactions}
                checklist={checklist}
                onToggleChecklistItem={handleToggleChecklistItem}
                businessProfile={businessProfile}
                onOpenDraftReminder={handleOpenDraftReminder}
                onOpenSSTFiling={() => setIsSSTFilingOpen(true)}
              />
            )}
            {currentTab === 'transactions' && (
              <TransactionsView transactions={transactions} onAddTransaction={handleAddTransaction} onResolveFlagged={handleResolveFlagged} />
            )}
            {currentTab === 'invoices' && (
              <InvoicesView
                invoices={invoices}
                onOpenNewInvoice={() => setIsNewInvoiceOpen(true)}
                onOpenDraftReminder={handleOpenDraftReminder}
                onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
                onDeleteInvoice={handleDeleteInvoice}
              />
            )}
            {currentTab === 'tax' && (
              <TaxView invoices={invoices} transactions={transactions} onOpenSSTFiling={() => setIsSSTFilingOpen(true)} />
            )}            
            {currentTab === 'expenses' && (
              <ExpensesView transactions={transactions} onOpenReceiptScan={() => setIsReceiptScanOpen(true)} onAddExpense={() => setCurrentTab('transactions')} />
            )}
            {currentTab === 'bank' && <BankCashView />}
            {currentTab === 'customers' && (
              <CustomersView invoices={invoices} onOpenNewInvoice={() => setIsNewInvoiceOpen(true)} />
            )}
            {currentTab === 'suppliers' && <SuppliersView />}

            {currentTab === 'reports' && (
              <ReportsView invoices={invoices} transactions={transactions} businessProfile={businessProfile} />
            )}
            
            {currentTab === 'settings' && (
              <SettingsView businessProfile={businessProfile} onSaveProfile={handleSaveProfile} />
            )}
          </div>
        </main>
      </div>

      <CopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        currentTab={currentTab}
        invoices={invoices}
        transactions={transactions}
        businessProfile={businessProfile}
        onNavigateTab={setCurrentTab}
        onOpenDraftReminder={handleOpenDraftReminder}
        onOpenSSTFiling={() => setIsSSTFilingOpen(true)}
      />

      <CreateInvoiceModal
        isOpen={isNewInvoiceOpen}
        onClose={() => setIsNewInvoiceOpen(false)}
        onSaveInvoice={handleSaveInvoice}
        nextInvoiceNumber={nextInvoiceNumber}
      />
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        businessProfile={businessProfile}
        onSaveProfile={handleSaveProfile}
      />
      <DraftReminderModal
        isOpen={isDraftReminderOpen}
        onClose={() => setIsDraftReminderOpen(false)}
        invoice={selectedReminderInvoice}
        onSendSuccess={handleReminderSentSuccess}
      />
      <SSTFilingModal isOpen={isSSTFilingOpen} onClose={() => setIsSSTFilingOpen(false)} onFilingSubmitted={handleFilingSubmitted} />
      <ReceiptScanModal isOpen={isReceiptScanOpen} onClose={() => setIsReceiptScanOpen(false)} onExpenseAdded={handleAddTransaction} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl text-slate-800 px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 glow-indigo">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;