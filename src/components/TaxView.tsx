import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  ArrowUpRight, 
  Clock, 
  Building2, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { sstCategories, sstFilingsHistory } from '../data/mockData';
import { SSTFiling } from '../types';

interface TaxViewProps {
  onOpenSSTFiling: () => void;
  filings: SSTFiling[];
}

export const TaxView: React.FC<TaxViewProps> = ({ onOpenSSTFiling, filings }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Jan 2024 - Jun 2024');

  const handleExportTaxSummary = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Category,Type,Taxable Amount (RM),Tax Rate (%),Tax Amount (RM)", 
        ...sstCategories.map(c => `"${c.name}","${c.categoryType}",${c.taxableAmount},${c.taxRate},${c.taxAmount}`)
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SST_02_Summary_Q2_2024.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header & Date Range */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">Tax & SST Reporting</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">Malaysian Sales & Services Tax (SST) filing automation & compliance.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 glass-card bg-white/80 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-slate-600 shadow-sm transition-all">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{selectedPeriod}</span>
          </button>
          <button
            onClick={handleExportTaxSummary}
            className="flex items-center gap-2 px-3.5 py-2 glass-card bg-white/80 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-slate-600 shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Current Filing Period Banner */}
      <div className="glass-card bg-gradient-to-r from-emerald-950/40 via-white/60 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 md:p-6 shadow-level-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-600 text-slate-900 flex items-center justify-center shadow-md flex-shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase">
                Active Bi-Monthly Cycle
              </span>
              <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Due in 15 days (Jul 31, 2024)
              </span>
            </div>
            <h3 className="font-bold text-lg md:text-xl text-slate-800 mt-1">
              Current Filing Period: Q2 2024
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Royal Malaysian Customs Department (JKDM) SST-02 Return is auto-calculated.
            </p>
          </div>
        </div>

        <button
          id="btn-start-sst-filing"
          onClick={onOpenSSTFiling}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 font-semibold text-xs md:text-sm rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start SST-02 Filing</span>
        </button>
      </div>

      {/* 4 Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Taxable Sales */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-36 group hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Total Taxable Sales</span>
            <Building2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
              RM 450,000.00
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+12% vs last period</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total SST Payable */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-36 group hover:border-rose-500/50 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Total SST Payable</span>
            <ShieldCheck className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="font-bold text-2xl md:text-3xl text-rose-400 tracking-tight">
              RM 27,000.00
            </div>
            <p className="text-xs text-slate-500 mt-1">Calculated at 6% & 10% rates</p>
          </div>
        </div>

        {/* Card 3: Input Tax Credit */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-36 group hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Input Tax Credit</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="font-bold text-2xl md:text-3xl text-emerald-400 tracking-tight">
              RM 5,400.00
            </div>
            <p className="text-xs text-slate-500 mt-1">Deductible from payable</p>
          </div>
        </div>

        {/* Card 4: Net SST Due */}
        <div className="glass-card bg-gradient-to-br from-emerald-950/50 to-white/80 rounded-2xl p-5 shadow-level-1 border border-emerald-500/40 flex flex-col justify-between h-36 group hover:border-emerald-400 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Net SST Due</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
          <div>
            <div className="font-bold text-2xl md:text-3xl text-cyan-300 tracking-tight">
              RM 21,600.00
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">To be remitted to JKDM</p>
          </div>
        </div>
      </div>

      {/* SST Breakdown Table */}
      <div className="glass-card bg-white/60 rounded-2xl shadow-level-1 border border-gray-200/80 overflow-hidden">
        <div className="p-5 border-b border-gray-200/80 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base md:text-lg text-slate-800">SST Breakdown (JKDM Schedule)</h3>
            <p className="text-xs text-slate-600">Disaggregated sales tax and service tax schedule</p>
          </div>
          <button
            onClick={handleExportTaxSummary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Table</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/60 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-gray-200/80">
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5 text-right">Taxable Amount</th>
                <th className="px-6 py-3.5 text-center">Tax Rate</th>
                <th className="px-6 py-3.5 text-right">Tax Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs md:text-sm text-slate-600">
              <tr className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">
                  Sales (Goods - Wholesale Roasted Coffee Beans)
                </td>
                <td className="px-6 py-4 text-right text-slate-600">RM 300,000.00</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-xs">
                    10%
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-800">RM 30,000.00</td>
              </tr>
              <tr className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">
                  Services (Cafe Dining, Event Catering, Barista Services)
                </td>
                <td className="px-6 py-4 text-right text-slate-600">RM 150,000.00</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-xs">
                    6%
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-800">RM 9,000.00</td>
              </tr>
              <tr className="bg-white/40 font-bold">
                <td className="px-6 py-3.5 text-slate-800">Gross Total</td>
                <td className="px-6 py-3.5 text-right text-slate-800">RM 450,000.00</td>
                <td className="px-6 py-3.5 text-center text-slate-500">-</td>
                <td className="px-6 py-3.5 text-right text-slate-800">RM 39,000.00</td>
              </tr>
              <tr className="text-xs text-slate-600">
                <td className="px-6 py-3 text-rose-400">Less: Exemptions / Approved Input Tax Credits</td>
                <td className="px-6 py-3 text-right">-</td>
                <td className="px-6 py-3 text-center">-</td>
                <td className="px-6 py-3 text-right text-rose-400 font-semibold">- RM 17,400.00</td>
              </tr>
              <tr className="bg-emerald-500/10 font-bold text-sm text-emerald-300 border-t border-emerald-500/20">
                <td className="px-6 py-4">Net SST Due (Form SST-02 Box 11)</td>
                <td className="px-6 py-4 text-right">-</td>
                <td className="px-6 py-4 text-center">-</td>
                <td className="px-6 py-4 text-right text-base text-cyan-300 font-bold">RM 21,600.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Filing History */}
      <div className="glass-card bg-white/60 rounded-2xl shadow-level-1 border border-gray-200/80 p-5 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-base md:text-lg text-slate-800">Filing History</h3>
          <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1">
            <span>View All History</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-800/50">
          {filings.map((filing) => (
            <div key={filing.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="font-bold text-xs md:text-sm text-slate-800">{filing.period}</h4>
                <p className="text-xs text-slate-600">Submitted on {filing.submissionDate} via MySST Portal</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-slate-800">
                  RM {filing.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Paid</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
