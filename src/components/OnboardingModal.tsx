import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  CreditCard, 
  Sliders, 
  ShieldCheck, 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessProfile: BusinessProfile;
  onSaveProfile: (profile: BusinessProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  businessProfile,
  onSaveProfile
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessProfile>({ ...businessProfile });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { num: 1, title: 'Business Info' },
    { num: 2, title: 'Chart of Accounts' },
    { num: 3, title: 'Opening Balances' },
    { num: 4, title: 'Preferences' }
  ];

  const handleSaveAndNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onSaveProfile(formData);
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in select-none">
      <div className="glass-panel bg-slate-900/95 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-800 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {Math.round((currentStep / steps.length) * 100)}% Completed
            </span>
          </div>

          {/* Step Progress Line */}
          <div className="flex items-center gap-2">
            {steps.map((step) => (
              <div
                key={step.num}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  step.num <= currentStep ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-slate-800'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Step 1: Business Info (Screen 8) */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h3 className="font-bold text-xl md:text-2xl text-slate-100">Set Up Your Business Profile</h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Enter your company registration and tax details to customize your invoices and SST returns.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aiman's Cafe"
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">SSM Registration No.</label>
                <input
                  type="text"
                  value={formData.ssmNo}
                  onChange={(e) => setFormData({ ...formData, ssmNo: e.target.value })}
                  placeholder="e.g. 202301045678 (1523412-V)"
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-indigo-500 outline-none transition-colors"
                  >
                    <option value="Food & Beverage" className="bg-slate-900 text-slate-200">Food & Beverage / F&B</option>
                    <option value="Retail & Wholesale" className="bg-slate-900 text-slate-200">Retail & Wholesale</option>
                    <option value="Professional Services" className="bg-slate-900 text-slate-200">Professional Services</option>
                    <option value="Technology & SaaS" className="bg-slate-900 text-slate-200">Technology & SaaS</option>
                    <option value="Construction & Logistics" className="bg-slate-900 text-slate-200">Construction & Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Financial Year End</label>
                  <select
                    value={formData.financialYearEnd}
                    onChange={(e) => setFormData({ ...formData, financialYearEnd: e.target.value })}
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-indigo-500 outline-none transition-colors"
                  >
                    <option value="December (31 Dec)" className="bg-slate-900 text-slate-200">December (31 Dec)</option>
                    <option value="March (31 Mar)" className="bg-slate-900 text-slate-200">March (31 Mar)</option>
                    <option value="June (30 Jun)" className="bg-slate-900 text-slate-200">June (30 Jun)</option>
                    <option value="September (30 Sep)" className="bg-slate-900 text-slate-200">September (30 Sep)</option>
                  </select>
                </div>
              </div>

              {/* Tax Settings */}
              <div className="pt-3 border-t border-slate-800/80">
                <label className="block text-xs font-bold text-slate-300 mb-2">Tax Settings (SST)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.sstRegistered
                        ? 'border-indigo-500/80 bg-indigo-500/10 font-semibold'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sst"
                      checked={formData.sstRegistered}
                      onChange={() => setFormData({ ...formData, sstRegistered: true })}
                      className="accent-indigo-500"
                    />
                    <div>
                      <span className="text-xs md:text-sm text-slate-200 block">Registered for SST</span>
                      <span className="text-[11px] text-slate-400">File Form SST-02 bi-monthly</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      !formData.sstRegistered
                        ? 'border-indigo-500/80 bg-indigo-500/10 font-semibold'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sst"
                      checked={!formData.sstRegistered}
                      onChange={() => setFormData({ ...formData, sstRegistered: false })}
                      className="accent-indigo-500"
                    />
                    <div>
                      <span className="text-xs md:text-sm text-slate-200 block">Not Registered</span>
                      <span className="text-[11px] text-slate-400">Below RM 500k annual threshold</span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Default Tax Rate</label>
                  <select
                    value={formData.defaultTaxRate}
                    onChange={(e) => setFormData({ ...formData, defaultTaxRate: parseInt(e.target.value) })}
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-indigo-500 outline-none transition-colors"
                  >
                    <option value={6} className="bg-slate-900 text-slate-200">6% - Standard Service Tax</option>
                    <option value={10} className="bg-slate-900 text-slate-200">10% - Standard Sales Tax (Goods)</option>
                    <option value={0} className="bg-slate-900 text-slate-200">0% - Tax Exempt / Zero Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Chart of Accounts */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h3 className="font-bold text-xl md:text-2xl text-slate-100">Chart of Accounts</h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                We've pre-configured a standard Malaysian SME Chart of Accounts tailored for {formData.industry}.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { code: '1000 - 1999', name: 'Assets (Maybank Premier, Cash Drawer, Receivables)', count: '4 accounts' },
                { code: '2000 - 2999', name: 'Liabilities (SST Payable, Supplier AP)', count: '3 accounts' },
                { code: '3000 - 3999', name: 'Equity (Owner Capital, Retained Earnings)', count: '2 accounts' },
                { code: '4000 - 4999', name: 'Revenue (F&B Sales, Catering, Wholesale)', count: '3 accounts' },
                { code: '5000 - 6999', name: 'Expenses (Inventory, Payroll, Rent, Utilities)', count: '8 accounts' },
              ].map((acc) => (
                <div key={acc.code} className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 block">{acc.code}</span>
                    <span className="text-xs md:text-sm text-slate-200 font-medium">{acc.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                    {acc.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Opening Balances */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h3 className="font-bold text-xl md:text-2xl text-slate-100">Opening Bank Balances</h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Enter your starting ledger balances as of 1 Jan 2024.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Maybank Premier Current Account</h4>
                  <p className="text-xs text-slate-400">Account: 5140-1234-4321</p>
                </div>
                <div className="w-40">
                  <input
                    type="text"
                    defaultValue="RM 42,100.00"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-right text-xs md:text-sm font-bold text-slate-100 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Physical Store Cash Drawer</h4>
                  <p className="text-xs text-slate-400">Bangsar Branch Float</p>
                </div>
                <div className="w-40">
                  <input
                    type="text"
                    defaultValue="RM 3,500.00"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-right text-xs md:text-sm font-bold text-slate-100 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preferences */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h3 className="font-bold text-xl md:text-2xl text-slate-100">AI Copilot & Notifications</h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Configure proactive automated insights and Malaysian tax reminders.
              </p>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <label className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div>
                  <span className="font-bold text-slate-200 block">Duplicate Charge Detection</span>
                  <span className="text-[11px] text-slate-400">Flag duplicate supplier bills and SaaS charges</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-500 rounded" />
              </label>

              <label className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div>
                  <span className="font-bold text-slate-200 block">Automated Overdue Payment Reminders</span>
                  <span className="text-[11px] text-slate-400">Copilot drafts reminder emails for invoices &gt; 7 days overdue</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-500 rounded" />
              </label>

              <label className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div>
                  <span className="font-bold text-slate-200 block">JKDM Bi-Monthly SST Deadlines</span>
                  <span className="text-[11px] text-slate-400">Receive 15-day and 5-day warning notifications</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-500 rounded" />
              </label>
            </div>
          </div>
        )}

        {/* PDPA Security Notice */}
        <div className="mt-6 p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            Your data is encrypted with AES-256 and processed in compliance with the Malaysian Personal Data Protection Act (PDPA).
          </span>
        </div>

        {/* Modal Footer Controls */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Skip Setup
            </button>
          )}

          <button
            onClick={handleSaveAndNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all active:scale-98"
          >
            <span>{currentStep === 4 ? 'Complete Setup' : 'Save & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {showSuccessToast && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mb-3">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="font-bold text-xl text-slate-100">Profile Updated!</h4>
            <p className="text-xs text-slate-400 mt-1">Your business parameters are now active across Fintel AI.</p>
          </div>
        )}
      </div>
    </div>
  );
};
