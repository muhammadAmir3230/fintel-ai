import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Store, ChevronDown, Check, Sparkles, MessageSquare } from 'lucide-react';
import { BusinessProfile } from '../types';

interface HeaderProps {
  businessProfile: BusinessProfile;
  onUpdateBusinessName: (name: string) => void;
  copilotOpen: boolean;
  onToggleCopilot: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenHelp: () => void;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  businessProfile,
  onUpdateBusinessName,
  copilotOpen,
  onToggleCopilot,
  searchTerm,
  onSearchChange,
  onOpenHelp,
  onOpenSidebar
}) => {
  const [showBizDropdown, setShowBizDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const businesses = [
    { name: businessProfile.name, type: 'Main Branch' },
  ];

  return (
    <header 
      id="top-navbar"
      className="bg-[#f8f9ff]/80 backdrop-blur-xl sticky top-0 flex justify-between items-center w-full px-4 md:px-8 py-3.5 z-40 border-b border-gray-200/80"
    >
      {/* Left: Hamburger (mobile) + Greeting & Search */}
      <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 text-slate-700 shrink-0"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="font-bold text-base md:text-xl text-slate-800 tracking-tight truncate">
            Good morning, {businessProfile.ownerName}
          </span>
          <span className="text-xl animate-bounce duration-1000 hidden sm:inline">👋</span>
        </div>

        <div className="relative max-w-xs w-full hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
          <input
            id="global-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search invoices, clients, tax..."
            className="w-full bg-white/80 border border-gray-200 rounded-full py-1.5 pl-10 pr-4 text-xs md:text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Right: Business Selector & User Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Business Selector */}
        <div className="relative">
          <button
            id="business-selector-dropdown"
            onClick={() => setShowBizDropdown(!showBizDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-white/80 hover:border-gray-200 shadow-sm hover:shadow transition-all text-left"
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span className="text-xs md:text-sm font-semibold text-slate-600 max-w-[80px] md:max-w-[160px] truncate">
              {businessProfile.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
          </button>

          {showBizDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-level-2 border border-gray-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-semibold text-slate-600 uppercase tracking-wider border-b border-gray-200">
                Select Active Entity
              </div>
              <div className="space-y-1 mt-1">
                {businesses.map((biz) => {
                  const isSelected = biz.name.startsWith(businessProfile.name);
                  return (
                    <button
                      key={biz.name}
                      onClick={() => {
                        onUpdateBusinessName(biz.name.split(' (')[0]);
                        setShowBizDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        isSelected ? 'bg-emerald-600/20 text-emerald-300 font-semibold border border-emerald-500/30' : 'text-slate-600 hover:bg-gray-50/80'
                      }`}
                    >
                      <div>
                        <p>{biz.name}</p>
                        <p className="text-[10px] text-slate-600">{biz.type}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Copilot Toggle Pill */}
        <button
          id="toggle-copilot-btn"
          onClick={onToggleCopilot}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            copilotOpen
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-slate-900 border-emerald-400/30 shadow-md shadow-emerald-500/20'
              : 'bg-white/80 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden sm:inline">Copilot AI</span>
        </button>

        {/* Notifications */}
        <div className="relative hidden sm:block">
          <button
            id="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-gray-50/60 rounded-xl transition-all relative border border-transparent hover:border-gray-200"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#020617]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-level-2 border border-gray-200 p-4 z-50">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <h4 className="font-bold text-sm text-slate-800">Notifications (3)</h4>
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">New Alerts</span>
              </div>
              <div className="divide-y divide-slate-800/80 mt-2 max-h-64 overflow-y-auto chat-scroll">
                <div className="py-2.5 text-xs">
                  <p className="font-semibold text-rose-400">3 Overdue Invoices</p>
                  <p className="text-slate-600 text-[11px] mt-0.5">INV-2023-089 is now 16 days past due date.</p>
                </div>
                <div className="py-2.5 text-xs">
                  <p className="font-semibold text-emerald-400">SST-02 Filing Due Soon</p>
                  <p className="text-slate-600 text-[11px] mt-0.5">Filing for Q2 2024 is due in 15 days (Jul 31).</p>
                </div>
                <div className="py-2.5 text-xs">
                  <p className="font-semibold text-amber-400">Duplicate Charge Flagged</p>
                  <p className="text-slate-600 text-[11px] mt-0.5">RM 1,200 from Specialty Beans was charged twice.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          id="help-btn"
          onClick={onOpenHelp}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-gray-50/60 rounded-xl transition-all border border-transparent hover:border-gray-200 hidden sm:inline-flex"
          title="Help & Malaysian Tax Rules"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-500/40 shadow-sm">
            <img
              src={businessProfile.avatarUrl}
              alt={businessProfile.ownerName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};