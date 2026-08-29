import React from 'react';
import { CreditCard, ScanLine, Plus, Search, Calendar, Download, TrendingUp, AlertTriangle } from 'lucide-react';
import { Transaction } from '../types';

interface ExpensesViewProps {
  transactions: Transaction[];
  onOpenReceiptScan: () => void;
  onAddExpense: () => void;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({
  transactions,
  onOpenReceiptScan,
  onAddExpense
}) => {
  const expenseList = transactions.filter((t) => t.type === 'outflow');
  const totalExpense = expenseList.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight">Expenses & Bills</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Track operating costs, supplier payments, and deductibles.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenReceiptScan}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 rounded-xl text-xs font-semibold border border-cyan-500/30 transition-all hover:shadow-cyan-500/10 shadow-sm"
          >
            <ScanLine className="w-4 h-4" />
            <span>AI Receipt OCR</span>
          </button>
          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:brightness-110 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* Expense Summary Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 group hover:border-rose-500/50 transition-all">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Monthly Expenses</span>
          <div className="font-bold text-2xl md:text-3xl text-rose-400 mt-2">
            RM {totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across {expenseList.length} recorded items</p>
        </div>

        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 group hover:border-purple-500/50 transition-all">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Category</span>
          <div className="font-bold text-2xl md:text-3xl text-slate-100 mt-2">
            Staff Salaries (40%)
          </div>
          <p className="text-xs text-slate-500 mt-1">RM 27,284.00 allocated this month</p>
        </div>

        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 group hover:border-emerald-500/50 transition-all">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Deductible SST Input Tax</span>
          <div className="font-bold text-2xl md:text-3xl text-emerald-400 mt-2">
            RM 5,400.00
          </div>
          <p className="text-xs text-slate-500 mt-1">Credited against output tax</p>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="glass-card bg-slate-900/60 rounded-2xl shadow-level-1 border border-slate-800/80 overflow-hidden">
        <div className="p-5 border-b border-slate-800/80 flex justify-between items-center">
          <h3 className="font-bold text-base md:text-lg text-slate-100">Recent Expenses</h3>
          <span className="text-xs font-semibold text-slate-400">{expenseList.length} entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Payee / Description</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Paid Via</th>
                <th className="px-6 py-3.5 text-right">Amount (RM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs md:text-sm text-slate-200">
              {expenseList.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 text-slate-400">{exp.date}</td>
                  <td className="px-6 py-4 font-semibold text-slate-200">{exp.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-lg text-xs font-medium">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{exp.account}</td>
                  <td className="px-6 py-4 text-right font-bold text-rose-400">
                    - RM {exp.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
