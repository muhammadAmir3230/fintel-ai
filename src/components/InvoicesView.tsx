import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Send, 
  Eye, 
  MoreVertical, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Trash2, 
  Download,
  Mail,
  X,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Invoice } from '../types';

interface InvoicesViewProps {
  invoices: Invoice[];
  onOpenNewInvoice: () => void;
  onOpenDraftReminder: (invoiceId: string) => void;
  onUpdateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  onDeleteInvoice: (id: string) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  onOpenNewInvoice,
  onOpenDraftReminder,
  onUpdateInvoiceStatus,
  onDeleteInvoice
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'recurring' | 'estimates'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'draft'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Filter logic
  const filteredInvoices = invoices.filter((inv) => {
    if (activeTab === 'recurring' && inv.type !== 'recurring') return false;
    if (activeTab === 'estimates' && inv.type !== 'estimate') return false;
    if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
    if (searchQuery) {
      const match =
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.customerName.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  // Calculate Metrics
  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalReceived = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.amount, 0);
  const totalOutstanding = invoices
    .filter((inv) => inv.status === 'pending')
    .reduce((acc, inv) => acc + inv.amount, 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((acc, inv) => acc + inv.amount, 0);

  const receivedPercent = Math.min(100, Math.round((totalReceived / (totalInvoiced || 1)) * 100));
  const overdueCount = invoices.filter((i) => i.status === 'overdue').length;

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">Sales & Invoices</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">Manage your receivables and track business growth.</p>
        </div>
        <button
          onClick={onOpenNewInvoice}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Action Bar (Tabs, Search, Filter) */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
        {/* Type Selector Tabs */}
        <div className="flex items-center gap-1 glass-card bg-white/80 p-1 rounded-xl border border-gray-200 shadow-level-1 w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 hover:text-slate-600 hover:bg-gray-50/60'
            }`}
          >
            All Invoices
          </button>
          <button
            onClick={() => setActiveTab('recurring')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'recurring'
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 hover:text-slate-600 hover:bg-gray-50/60'
            }`}
          >
            Recurring
          </button>
          <button
            onClick={() => setActiveTab('estimates')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'estimates'
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 hover:text-slate-600 hover:bg-gray-50/60'
            }`}
          >
            Estimates
          </button>
        </div>

        {/* Search & Filter Inputs */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoices, customers..."
              className="w-full bg-white/80 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm focus:border-emerald-500 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Metrics Bento Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Invoiced */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-36 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Total Invoiced</span>
            <FileText className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-500">RM</span>
              <span className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
                {totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+12.5% from last month</span>
            </div>
          </div>
        </div>

        {/* Amount Received */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-36 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Amount Received</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-500">RM</span>
              <span className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
                {totalReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden border border-gray-200/50">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${receivedPercent}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-600">{receivedPercent}%</span>
            </div>
          </div>
        </div>

        {/* Outstanding Balance */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-36 relative group hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Outstanding Balance</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-500">RM</span>
              <span className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
                {totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">Across {invoices.filter(i => i.status === 'pending').length} active invoices</p>
          </div>
        </div>

        {/* Overdue (Alert Card) */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-rose-500/30 flex flex-col justify-between h-36 relative group hover:border-rose-500/60 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Overdue</span>
            <div className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-rose-400">RM</span>
              <span className="font-bold text-2xl md:text-3xl text-rose-400 tracking-tight">
                {totalOverdue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button
              onClick={() => {
                const ov = invoices.find((i) => i.status === 'overdue');
                if (ov) onOpenDraftReminder(ov.id);
              }}
              className="mt-1 text-xs text-rose-400 font-bold flex items-center hover:underline gap-1"
            >
              <span>View {overdueCount} overdue invoices</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table Card */}
      <div className="glass-card bg-white/60 rounded-2xl shadow-level-1 border border-gray-200/80 overflow-hidden">
        <div className="p-5 border-b border-gray-200/80 flex justify-between items-center">
          <h3 className="font-bold text-base md:text-lg text-slate-800">Recent Invoices</h3>
          <span className="text-xs font-semibold text-slate-600">
            Showing {filteredInvoices.length} invoices
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/60 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-gray-200/80">
                <th className="px-6 py-3.5">Invoice #</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Due Date</th>
                <th className="px-6 py-3.5 text-right">Amount (RM)</th>
                <th className="px-6 py-3.5 text-center">Status</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs md:text-sm text-slate-600">
              {filteredInvoices.map((inv) => {
                const isOverdue = inv.status === 'overdue';
                const isPaid = inv.status === 'paid';
                return (
                  <tr
                    key={inv.id}
                    className={`hover:bg-gray-50/40 transition-colors group cursor-pointer ${
                      isOverdue ? 'bg-rose-500/5' : ''
                    }`}
                    onClick={() => setSelectedInvoice(inv)}
                  >
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          isPaid 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {inv.customerInitials}
                        </div>
                        <span className="font-semibold text-slate-600">{inv.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {inv.date}
                    </td>
                    <td className={`px-6 py-4 font-medium ${
                      isOverdue ? 'text-rose-400 font-bold' : 'text-slate-600'
                    }`}>
                      {inv.dueDate}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-sm text-slate-800">
                      RM {inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {inv.status === 'overdue' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                          Overdue
                        </span>
                      )}
                      {inv.status === 'paid' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                          Paid
                        </span>
                      )}
                      {inv.status === 'pending' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                          Sent / Pending
                        </span>
                      )}
                      {inv.status === 'draft' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-slate-600 border border-gray-200 uppercase">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5 text-slate-600">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-1.5 hover:text-emerald-400 hover:bg-gray-50 rounded-lg transition-colors"
                          title="View Invoice Sheet"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenDraftReminder(inv.id)}
                          className="p-1.5 hover:text-emerald-400 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Draft / Send Payment Reminder"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteInvoice(inv.id)}
                          className="p-1.5 hover:text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                          title="Delete Invoice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Sheet Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card bg-white/95 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-6 border-b border-gray-200">
              <div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                  Tax Invoice
                </span>
                <h3 className="font-bold text-2xl text-slate-800 mt-2">{selectedInvoice.invoiceNumber}</h3>
                <p className="text-xs text-slate-600">Aiman's Cafe • SSM: 202301045678 (1523412-V)</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-gray-50 text-slate-600 hover:bg-gray-100 transition-all border border-gray-200"
                  title="Print"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-gray-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bill To & Dates */}
            <div className="grid grid-cols-2 gap-6 py-6 border-b border-gray-200 text-xs md:text-sm">
              <div>
                <span className="text-slate-600 font-semibold uppercase text-[11px] block mb-1">Billed To:</span>
                <h4 className="font-bold text-base text-slate-800">{selectedInvoice.customerName}</h4>
                <p className="text-slate-600">{selectedInvoice.customerEmail || 'billing@client.com.my'}</p>
                <p className="text-slate-600">Kuala Lumpur, Malaysia</p>
              </div>
              <div className="space-y-1 text-right">
                <div>
                  <span className="text-slate-600">Issue Date: </span>
                  <span className="font-semibold text-slate-600">{selectedInvoice.date}</span>
                </div>
                <div>
                  <span className="text-slate-600">Due Date: </span>
                  <span className={`font-bold ${selectedInvoice.status === 'overdue' ? 'text-rose-400' : 'text-slate-600'}`}>
                    {selectedInvoice.dueDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">Status: </span>
                  <span className="font-bold uppercase text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="py-6 border-b border-gray-200">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] text-slate-600 uppercase font-bold">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Unit Price (RM)</th>
                    <th className="pb-2 text-right">Total (RM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {selectedInvoice.items?.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 font-semibold text-slate-600">{item.description}</td>
                      <td className="py-3 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-3 text-right text-slate-600">RM {item.unitPrice.toFixed(2)}</td>
                      <td className="py-3 text-right font-bold text-slate-800">RM {item.total.toFixed(2)}</td>
                    </tr>
                  )) || (
                    <tr>
                      <td className="py-3 font-semibold text-slate-600">Professional Catering & Beverage Supply</td>
                      <td className="py-3 text-center text-slate-600">1</td>
                      <td className="py-3 text-right text-slate-600">RM {selectedInvoice.amount.toFixed(2)}</td>
                      <td className="py-3 text-right font-bold text-slate-800">RM {selectedInvoice.amount.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Calculation */}
            <div className="py-6 flex justify-end">
              <div className="w-64 space-y-2 text-xs md:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="text-slate-600">RM {(selectedInvoice.amount / 1.06).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SST (6%):</span>
                  <span className="text-slate-600">RM {(selectedInvoice.amount - (selectedInvoice.amount / 1.06)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-slate-800 pt-2 border-t border-gray-200">
                  <span>Total Due:</span>
                  <span className="text-emerald-400">RM {selectedInvoice.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Bar inside preview */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onUpdateInvoiceStatus(selectedInvoice.id, 'paid');
                    setSelectedInvoice({ ...selectedInvoice, status: 'paid' });
                  }}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-xl transition-all"
                >
                  Mark as Paid
                </button>
                <button
                  onClick={() => {
                    onOpenDraftReminder(selectedInvoice.id);
                    setSelectedInvoice(null);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reminder</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 bg-gray-50 text-slate-600 text-xs font-semibold rounded-xl hover:bg-gray-100 border border-gray-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
