import React, { useState } from 'react';
import { 
  FileCheck, 
  X, 
  Check, 
  ShieldCheck, 
  Download, 
  Building2, 
  Send,
  AlertCircle 
} from 'lucide-react';
import { SSTFiling } from '../types';

interface SSTFilingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilingSubmitted: (newFiling: SSTFiling) => void;
}

export const SSTFilingModal: React.FC<SSTFilingModalProps> = ({
  isOpen,
  onClose,
  onFilingSubmitted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const handleSubmitFiling = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `SST02-2024-Q2-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceNo(generatedRef);
      setIsSubmitting(false);
      setStep(3);

      onFilingSubmitted({
        id: `filing-${Date.now()}`,
        period: 'Q2 2024 Filing (Apr - Jun 2024)',
        submissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        totalPaid: 21600.00,
        status: 'paid'
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in select-none">
      <div className="glass-panel bg-slate-900/95 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 rounded-full uppercase">
                  Royal Malaysian Customs
                </span>
                <span className="text-xs text-slate-400">MySST Portal Sync</span>
              </div>
              <h3 className="font-bold text-xl text-slate-100 mt-0.5">Form SST-02 Return Filing</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="py-5 space-y-5 text-xs md:text-sm animate-in fade-in">
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <h4 className="font-bold text-sm text-slate-200">Tax Period: Q2 2024 (1 Apr 2024 - 30 Jun 2024)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Registered Taxable Person: Aiman's Cafe (W10-1808-32000456)</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/50 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-200 block">Box 5a: Value of Taxable Goods (10%)</span>
                  <span className="text-[11px] text-slate-400">Wholesale Roasted Beans & Merchandise</span>
                </div>
                <span className="font-bold text-slate-200">RM 300,000.00</span>
              </div>

              <div className="p-3.5 bg-slate-950/50 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-200 block">Box 5b: Value of Taxable Services (6%)</span>
                  <span className="text-[11px] text-slate-400">Catering & Barista Consultations</span>
                </div>
                <span className="font-bold text-slate-200">RM 150,000.00</span>
              </div>

              <div className="p-3.5 bg-slate-950/50 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-rose-400 block">Box 10: Gross Tax Payable</span>
                  <span className="text-[11px] text-slate-400">10% on Goods + 6% on Services</span>
                </div>
                <span className="font-bold text-rose-400">RM 39,000.00</span>
              </div>

              <div className="p-3.5 bg-slate-950/50 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-400 block">Box 10c: Input Tax Credits / Deductions</span>
                  <span className="text-[11px] text-slate-400">Approved raw ingredient exemptions</span>
                </div>
                <span className="font-bold text-emerald-400">- RM 17,400.00</span>
              </div>

              <div className="p-4 bg-emerald-500/15 rounded-2xl border border-emerald-500/30 flex justify-between items-center text-sm">
                <div>
                  <span className="font-bold text-emerald-300 block">Box 11: Net SST Amount Due</span>
                  <span className="text-xs text-emerald-400/80">Amount payable to Director General of Customs</span>
                </div>
                <span className="font-bold text-xl text-emerald-400">RM 21,600.00</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
              >
                Proceed to Declaration
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="py-5 space-y-5 text-xs md:text-sm animate-in fade-in">
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-sm text-slate-200">Authorised Signatory Declaration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                I, <span className="font-bold text-slate-200">Aiman Bin Razak</span> (NRIC: 920514-14-5891), acting as Proprietor/Director, hereby declare that the particulars given in this Return are true and correct in accordance with the Sales Tax Act 2018 & Service Tax Act 2018.
              </p>
            </div>

            <label className="flex items-start gap-3 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 w-4 h-4 accent-indigo-500 rounded" />
              <span className="text-xs text-slate-300">
                I confirm that all invoice calculations, exempt schedules, and input tax deductions have been verified against banking records.
              </span>
            </label>

            <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmitFiling}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting to MySST Portal...' : 'Authorize & Submit SST-02'}</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shadow-lg">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-slate-100">Form SST-02 Successfully Filed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your return for Q2 2024 has been submitted to the Royal Malaysian Customs Department.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl w-full text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">JKDM Reference No:</span>
                <span className="font-mono font-bold text-indigo-400">{referenceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Net SST Remitted:</span>
                <span className="font-bold text-emerald-400">RM 21,600.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-400 uppercase text-[10px]">Payment Processed</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
