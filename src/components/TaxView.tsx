// TARGET: src/components/TaxView.tsx  (replace the whole file)
// Real SST figures (simplified to 6% service tax) from the user's invoices + expenses.

import React from 'react';
import { FileText, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { Invoice, Transaction } from '../types';

interface TaxViewProps {
  invoices: Invoice[];
  transactions: Transaction[];
  onOpenSSTFiling: () => void;
}

const money = (n: number) => 'RM ' + n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const TaxView: React.FC<TaxViewProps> = ({ invoices, transactions, onOpenSSTFiling }) => {
  const RATE = 0.06; // 6% service tax (simplified)
  const taxableSales = invoices.reduce((s, i) => s + i.amount, 0);
  const sstPayable = taxableSales * RATE;
  const expenses = transactions.filter((t) => t.type === 'outflow').reduce((s, t) => s + t.amount, 0);
  const inputTaxCredit = expenses * RATE;
  const netDue = Math.max(0, sstPayable - inputTaxCredit);

  const Card = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      <div className={`font-bold text-2xl md:text-3xl mt-2 ${color || 'text-slate-900'}`}>{value}</div>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tax &amp; SST Reporting</h1>
          <p className="text-sm text-slate-500">Malaysian Sales &amp; Services Tax (SST) — auto-calculated from your data.</p>
        </div>
      </div>

      {/* Current period banner */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Current Filing Period</p>
            <p className="text-xs text-slate-500">Net SST-02 return is auto-calculated from your invoices and expenses.</p>
          </div>
        </div>
        <button onClick={onOpenSSTFiling} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl">
          <Sparkles className="w-4 h-4" /> Start SST-02 Filing
        </button>
      </div>

      {/* 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card label="Total Taxable Sales" value={money(taxableSales)} sub="Total invoiced" />
        <Card label="Total SST Payable" value={money(sstPayable)} sub="At 6% service tax" color="text-rose-500" />
        <Card label="Input Tax Credit" value={money(inputTaxCredit)} sub="Deductible from payable" color="text-emerald-600" />
        <Card label="Net SST Due" value={money(netDue)} sub="To be remitted to JKDM" color="text-sky-500" />
      </div>

      {/* breakdown table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h3 className="font-bold text-slate-900">SST Breakdown</h3>
          <p className="text-xs text-slate-500">Simplified service-tax schedule</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-right">Taxable Amount</th>
                <th className="px-6 py-3 text-center">Rate</th>
                <th className="px-6 py-3 text-right">Tax Amount</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4">Services (6%)</td>
                <td className="px-6 py-4 text-right">{money(taxableSales)}</td>
                <td className="px-6 py-4 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 text-[11px] font-bold">6%</span></td>
                <td className="px-6 py-4 text-right font-semibold">{money(sstPayable)}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 font-bold text-slate-900">Gross Total</td>
                <td className="px-6 py-4 text-right font-bold">{money(taxableSales)}</td>
                <td className="px-6 py-4 text-center">—</td>
                <td className="px-6 py-4 text-right font-bold">{money(sstPayable)}</td>
              </tr>
              <tr className="border-b border-gray-100 text-rose-500">
                <td className="px-6 py-4">Less: Input Tax Credit</td>
                <td className="px-6 py-4 text-right">—</td>
                <td className="px-6 py-4 text-center">—</td>
                <td className="px-6 py-4 text-right font-semibold">- {money(inputTaxCredit)}</td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="px-6 py-4 font-bold text-emerald-700">Net SST Due (Form SST-02)</td>
                <td className="px-6 py-4 text-right">—</td>
                <td className="px-6 py-4 text-center">—</td>
                <td className="px-6 py-4 text-right font-bold text-emerald-700">{money(netDue)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* filing history */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-slate-900 mb-2">Filing History</h3>
        <p className="text-sm text-slate-400">No SST filings submitted yet. Your submitted returns will appear here.</p>
      </div>
    </div>
  );
};