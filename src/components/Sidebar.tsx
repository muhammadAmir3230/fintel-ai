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
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as TabType, label: 'Transactions', icon: Receipt, badge: '2 Flagged' },
    { id: 'invoices' as TabType, label: 'Sales/Invoices', icon: FileText, badge: '3 Overdue' },
    { id: 'expenses' as TabType, label: 'Expenses', icon: CreditCard },
    { id: 'bank' as TabType, label: 'Bank & Cash', icon: Landmark },
    { id: 'customers' as TabType, label: 'Customers', icon: Users },
    { id: 'suppliers' as TabType, label: 'Suppliers', icon: Boxes },
    { id: 'reports' as TabType, label: 'Reports', icon: BarChart3 },
    { id: 'tax' as TabType, label: 'Tax & SST', icon: Wallet, badge: 'Due in 15d' },
  ];

  return (
    <aside 
      id="main-sidebar"
      className="fixed left-0 top-0 h-screen w-[280px] bg-[#030712]/90 backdrop-blur-2xl text-slate-100 flex flex-col py-6 z-50 select-none shadow-2xl border-r border-slate-800/80"
    >
      {/* Brand Header */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 p-1.5 flex items-center justify-center shadow-lg shadow-black/40 overflow-hidden flex-shrink-0">
            <img 
              src={businessProfile.logoUrl} 
              alt="Fintel Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-tight leading-none">
                Fintel AI
              </h1>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                SME
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1 truncate">Small Business Mode</p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="px-5 mb-5">
        <button
          id="sidebar-new-invoice-btn"
          onClick={onOpenNewInvoice}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-150 active:scale-[0.98] border border-indigo-400/20"
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
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-300 border-r-4 border-indigo-500 font-semibold shadow-inner'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-indigo-500 text-white shadow-sm' 
                    : 'bg-slate-800 border border-slate-700 text-slate-300'
                }`}>
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
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all text-left"
        >
          <Building2 className="w-5 h-5 text-slate-400" />
          <span>Business Setup Wizard</span>
        </button>
      </nav>

      {/* Footer Settings */}
      <div className="mt-auto px-3 pt-3 border-t border-slate-800/80 space-y-1">
        <button
          id="nav-link-settings"
          onClick={() => onSelectTab('settings')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            currentTab === 'settings'
              ? 'bg-indigo-500/20 text-indigo-300 font-semibold'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
          }`}
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
