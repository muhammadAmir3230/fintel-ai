import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  FileText, 
  CreditCard, 
  Landmark, 
  Users, 
  Boxes, 
  BarChart3, 
  Wallet, 
  Settings, 
  Plus, 
  Sparkles,
  HelpCircle,
  LogOut,
  Building2
} from 'lucide-react';
import { TabType, BusinessProfile } from '../types';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  businessProfile: BusinessProfile;
  onOpenNewInvoice: () => void;
  onOpenOnboarding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  businessProfile,
  onOpenNewInvoice,
  onOpenOnboarding
}) => {
  const navItems: { id: TabType; label: string; icon: any; badge?: string }[] = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as TabType, label: 'Transactions', icon: Receipt },
    { id: 'invoices' as TabType, label: 'Sales/Invoices', icon: FileText },
    { id: 'expenses' as TabType, label: 'Expenses', icon: CreditCard },
    { id: 'bank' as TabType, label: 'Bank & Cash', icon: Landmark },
    { id: 'customers' as TabType, label: 'Customers', icon: Users },
    { id: 'suppliers' as TabType, label: 'Suppliers', icon: Boxes },
    { id: 'reports' as TabType, label: 'Reports', icon: BarChart3 },
    { id: 'tax' as TabType, label: 'Tax & SST', icon: Wallet },
  ];

  return (
    <aside 
      id="main-sidebar"
      className="fixed left-0 top-0 h-screen w-[280px] bg-[#f8f9ff]/90 backdrop-blur-2xl text-slate-800 flex flex-col py-6 z-50 select-none shadow-2xl border-r border-gray-200/80"
    >
      {/* Brand Header */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 p-1.5 flex items-center justify-center shadow-lg shadow-black/40 overflow-hidden flex-shrink-0">
            <img 
              src={businessProfile.logoUrl} 
              alt="Fintel Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-pink-300 bg-clip-text text-slate-900 tracking-tight leading-none">
                Fintel AI
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                SME
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1 truncate">Small Business Mode</p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="px-5 mb-5">
        <button
          id="sidebar-new-invoice-btn"
          onClick={onOpenNewInvoice}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-slate-900 py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all duration-150 active:scale-[0.98] border border-emerald-400/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-1 chat-scroll">
        <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Core Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-300 border-r-4 border-emerald-500 font-semibold shadow-inner'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-gray-50/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[11px] font-bold px-2 py-0.5 bg-rose-500/20 text-rose-600 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="px-3 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Configuration
        </div>
        <button
          id="nav-link-onboarding-wizard"
          onClick={onOpenOnboarding}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-gray-50/60 transition-all text-left"
        >
          <Building2 className="w-5 h-5 text-slate-600" />
          <span>Business Setup Wizard</span>
        </button>
      </nav>

      {/* Footer Settings */}
      <div className="mt-auto px-3 pt-3 border-t border-gray-200/80 space-y-1">
        <button
          id="nav-link-settings"
          onClick={() => onSelectTab('settings')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            currentTab === 'settings'
              ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
              : 'text-slate-600 hover:text-slate-800 hover:bg-gray-50/60'
          }`}
        >
          <Settings className="w-5 h-5 text-slate-600" />
          <span>Settings</span>
        </button>
                <button
          onClick={() => supabase.auth.signOut()}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};
