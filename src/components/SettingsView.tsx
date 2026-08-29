import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Check, Building2, Bell, Cpu } from 'lucide-react';
import { BusinessProfile } from '../types';

interface SettingsViewProps {
  businessProfile: BusinessProfile;
  onSaveProfile: (profile: BusinessProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ businessProfile, onSaveProfile }) => {
  const [formData, setFormData] = useState<BusinessProfile>({ ...businessProfile });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 select-none max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight">Business Settings</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Configure company registration, SST tax parameters, and Copilot AI rules.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
          <Check className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Information Card */}
        <div className="glass-card bg-slate-900/60 rounded-3xl p-6 md:p-8 shadow-level-1 border border-slate-800/80 space-y-4">
          <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <span>Entity Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Company / Brand Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">SSM Registration Number</label>
              <input
                type="text"
                value={formData.ssmNo}
                onChange={(e) => setFormData({ ...formData, ssmNo: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Owner / Primary Contact</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* SST Tax Rules Card */}
        <div className="glass-card bg-slate-900/60 rounded-3xl p-6 md:p-8 shadow-level-1 border border-slate-800/80 space-y-4">
          <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span>Malaysian SST Configuration</span>
          </h3>

          <div className="space-y-3 text-xs md:text-sm">
            <label className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <span className="font-bold text-slate-200 block">Registered for SST with JKDM</span>
                <span className="text-[11px] text-slate-400">Automatic Form SST-02 bi-monthly calculation</span>
              </div>
              <input
                type="checkbox"
                checked={formData.sstRegistered}
                onChange={(e) => setFormData({ ...formData, sstRegistered: e.target.checked })}
                className="w-4 h-4 accent-indigo-500 rounded"
              />
            </label>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Default Service Tax Rate</label>
              <select
                value={formData.defaultTaxRate}
                onChange={(e) => setFormData({ ...formData, defaultTaxRate: parseInt(e.target.value) })}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none transition-colors"
              >
                <option value={6} className="bg-slate-900 text-slate-200">6% - Standard Service Tax</option>
                <option value={10} className="bg-slate-900 text-slate-200">10% - Sales Tax (Goods)</option>
                <option value={0} className="bg-slate-900 text-slate-200">0% - Exempt</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white rounded-xl font-semibold text-xs md:text-sm shadow-lg shadow-indigo-600/25 transition-all active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
