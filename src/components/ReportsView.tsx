// TARGET: src/components/ReportsView.tsx  (replace the whole file)
// Real financial reports built from the user's invoices + transactions, with PDF export.

import React, { useState } from 'react';
import { Printer, Download } from 'lucide-react';
import { Invoice, Transaction, BusinessProfile } from '../types';

interface ReportsViewProps {
  invoices: Invoice[];
  transactions: Transaction[];
  businessProfile: BusinessProfile;
}

const money = (n: number) => 'RM ' + n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const ReportsView: React.FC<ReportsViewProps> = ({ invoices, transactions, businessProfile }) => {
  const [tab, setTab] = useState<'pnl' | 'bs' | 'cf'>('pnl');

  // ---- real figures ----
  const paidInvoices = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const receivables = invoices.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0);
  const inflow = transactions.filter((t) => t.type === 'inflow').reduce((s, t) => s + t.amount, 0);
  const outflow = transactions.filter((t) => t.type === 'outflow').reduce((s, t) => s + t.amount, 0);
  const revenue = paidInvoices + inflow;
  const expenses = outflow;
  const netProfit = revenue - expenses;
  const margin = revenue ? ((netProfit / revenue) * 100).toFixed(1) : '0.0';

  // expenses grouped by category (for the P&L)
  const catMap: Record<string, number> = {};
  transactions.filter((t) => t.type === 'outflow').forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const expenseRows = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

  const cash = revenue - expenses;
  const totalAssets = cash + receivables;

  const doPrint = () => window.print();

  const Header = () => (
    <div className="text-center border-b border-gray-200 pb-4 mb-5">
      <h2 className="text-xl font-bold text-slate-900">{businessProfile.name}</h2>
      <p className="text-xs text-slate-500">
        {businessProfile.ssmNo ? `SSM: ${businessProfile.ssmNo} • ` : ''}{businessProfile.industry || 'Small Business'}
      </p>
      <p className="text-sm text-emerald-600 font-semibold mt-2">
        {tab === 'pnl' ? 'Statement of Profit & Loss' : tab === 'bs' ? 'Balance Sheet' : 'Statement of Cash Flows'}
      </p>
    </div>
  );

  const Row: React.FC<{ label: string; value: string; bold?: boolean; color?: string }> = ({ label, value, bold, color }) => ( <div className={`flex justify-between py-2 ${bold ? 'border-t border-gray-200 mt-1 pt-2' : ''}`}>
      <span className={`${bold ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{label}</span>
      <span className={`${bold ? 'font-bold' : 'font-semibold'} ${color || 'text-slate-800'}`}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-sm text-slate-500">Based on your real invoices and transactions.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={doPrint} className="inline-flex items-center gap-2 border border-gray-300 text-slate-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-gray-50">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button onClick={doPrint} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2 rounded-xl">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex bg-gray-100 rounded-xl p-1 no-print">
        {([['pnl', 'Profit & Loss'], ['bs', 'Balance Sheet'], ['cf', 'Cash Flow']] as const).map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === k ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Printable report */}
      <div id="report-print-area" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-3xl mx-auto">
        <Header />

        {tab === 'pnl' && (
          <div className="text-sm">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Revenue</p>
            <Row label="Sales & paid invoices" value={money(paidInvoices)} />
            {inflow > 0 && <Row label="Other income" value={money(inflow)} />}
            <Row label="Total Revenue" value={money(revenue)} bold color="text-emerald-600" />

            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-5 mb-1">Expenses</p>
            {expenseRows.length === 0 ? (
              <p className="text-slate-400 py-2">No expenses recorded.</p>
            ) : (
              expenseRows.map(([name, amt]) => <Row key={name} label={name} value={money(amt)} />)
            )}
            <Row label="Total Expenses" value={money(expenses)} bold color="text-rose-500" />

            <div className="mt-4 bg-emerald-50 rounded-xl p-4">
              <Row label={`Net Profit (Margin: ${margin}%)`} value={money(netProfit)} bold color="text-emerald-600" />
            </div>
          </div>
        )}

        {tab === 'bs' && (
          <div className="text-sm">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Assets</p>
            <Row label="Cash (net of expenses)" value={money(cash)} />
            <Row label="Accounts Receivable (unpaid invoices)" value={money(receivables)} />
            <Row label="Total Assets" value={money(totalAssets)} bold color="text-emerald-600" />

            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-5 mb-1">Equity</p>
            <Row label="Owner's Equity" value={money(totalAssets)} />
            <Row label="Total Liabilities & Equity" value={money(totalAssets)} bold />
            <p className="text-[11px] text-slate-400 mt-4 italic">Simplified balance sheet — liabilities & fixed assets not yet tracked.</p>
          </div>
        )}

        {tab === 'cf' && (
          <div className="text-sm">
            <Row label="Cash inflows from operations" value={'+ ' + money(revenue)} color="text-emerald-600" />
            <Row label="Operating outflows & expenses" value={'- ' + money(expenses)} color="text-rose-500" />
            <div className="mt-4 bg-emerald-50 rounded-xl p-4">
              <Row label="Net Cash Flow" value={money(revenue - expenses)} bold color="text-emerald-600" />
            </div>
            <p className="text-[11px] text-slate-400 mt-4 italic">Simplified cash flow based on recorded income & expenses.</p>
          </div>
        )}
      </div>
    </div>
  );
};
