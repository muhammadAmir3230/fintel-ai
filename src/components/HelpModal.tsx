import React from 'react';
import { HelpCircle, X, ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in select-none">
      <div className="glass-panel bg-white/95 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start pb-4 border-b border-gray-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Malaysian SME Tax & SST Guide</h3>
              <p className="text-xs text-slate-600">Quick reference for SST-02 filing & compliance</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-600 hover:text-slate-600 hover:bg-gray-50 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs md:text-sm">
          <div className="p-4 bg-white/60 rounded-2xl border border-gray-200 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-600">SST Registration Threshold</h4>
            <p className="text-xs text-slate-600">
              Businesses with total taxable turnover exceeding <span className="font-bold text-cyan-300">RM 500,000</span> within a 12-month period are required to register with the Royal Malaysian Customs Department (JKDM).
            </p>
          </div>

          <div className="p-4 bg-white/60 rounded-2xl border border-gray-200 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-600">Bi-Monthly Filing Deadlines</h4>
            <p className="text-xs text-slate-600">
              Form SST-02 must be furnished and tax paid no later than the last day of the month following the end of the taxable period (e.g. Q2 filing is due on 31 July).
            </p>
          </div>

          <div className="p-4 bg-white/60 rounded-2xl border border-gray-200 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-600">Standard Tax Rates</h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4 mt-1">
              <li><span className="font-semibold text-slate-600">Service Tax: 6% / 8%</span> on taxable services such as food & beverage catering and digital subscriptions.</li>
              <li><span className="font-semibold text-slate-600">Sales Tax: 10%</span> (standard rate) or 5% (concessionary) on manufactured/imported goods.</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
          >
            Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
};
