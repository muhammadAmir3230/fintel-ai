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
}

export const Header: React.FC<HeaderProps> = ({
  businessProfile,
  onUpdateBusinessName,
  copilotOpen,
  onToggleCopilot,
  searchTerm,
  onSearchChange,
  onOpenHelp
}) => {
  const [showBizDropdown, setShowBizDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const businesses = [
    { name: "Aiman's Cafe (HQ Bangsar)", type: 'Main Branch' },
    { name: "Aiman's Roastery (Subang)", type: 'Secondary' },
    { name: "Aiman Catering & Events", type: 'Wholesale' },
  ];

  return (
    <header 
      id="top-navbar"
      className="bg-[#020617]/80 backdrop-blur-xl sticky top-0 flex justify-between items-center w-full px-8 py-3.5 z-40 border-b border-slate-800/80"
    >
      {/* Left: Greeting & Search */}
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg md:text-xl text-slate-100 tracking-tight">
            Good morning, {businessProfile.ownerName}
          </span>
          <span className="text-xl animate-bounce duration-1000">👋</span>
        </div>

        <div className="relative max-w-xs w-full hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search invoices, clients, tax..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all"
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 shadow-sm hover:shadow transition-all text-left"
          >
            <Store className="w-4 h-4 text-indigo-400" />
            <span className="text-xs md:text-sm font-semibold text-slate-200 max-w-[120px] md:max-w-[160px] truncate">
              {businessProfile.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showBizDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-level-2 border border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
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
                        isSelected ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div>
                        <p>{biz.name}</p>
                        <p className="text-[10px] text-slate-400">{biz.type}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
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
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/30 shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/80 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span className="hidden sm:inline">Copilot AI</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all relative border border-transparent hover:border-slate-700"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#020617]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-level-2 border border-slate-800 p-4 z-50">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h4 className="font-bold text-sm text-slate-100">Notifications (3)</h4>
                <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">New Alerts</span>
              </div>
              <div className="divide-y divide-slate-800/80 mt-2 max-h-64 overflow-y-auto chat-scroll">
                <div className="py-2.5 text-xs">
                  <p className="font-semibold text-rose-400">3 Overdue Invoices</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">INV-2023-089 is now 16 days past due date.</p>
                </div>
                <div className="py-2.5 text-xs">
                  <p className="font-semibold text-emerald-400">SST-02 Filing Due Soon</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Filing for Q2 2024 is due in 15 days (Jul 31).</p>
                </div>
                <div className="py-2.5 text-xs">
                  <p className="font-semibold text-amber-400">Duplicate Charge Flagged</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">RM 1,200 from Specialty Beans was charged twice.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          id="help-btn"
          onClick={onOpenHelp}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all border border-transparent hover:border-slate-700"
          title="Help & Malaysian Tax Rules"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/40 shadow-sm">
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
