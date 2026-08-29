import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PiggyBank, 
  PlusCircle, 
  Receipt, 
  ScanLine, 
  Landmark, 
  BarChart2, 
  MoreVertical, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Circle,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { TabType, Invoice, Transaction, ChecklistItem, BusinessProfile } from '../types';
import { IncomeVsExpensesChart, ExpenseBreakdownDonut } from './Charts';

interface DashboardViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenNewInvoice: () => void;
  onOpenReceiptScan: () => void;
  invoices: Invoice[];
  transactions: Transaction[];
  checklist: ChecklistItem[];
  onToggleChecklistItem: (id: string) => void;
  businessProfile: BusinessProfile;
  onOpenDraftReminder: (invoiceId: string) => void;
  onOpenSSTFiling: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onOpenNewInvoice,
  onOpenReceiptScan,
  invoices,
  transactions,
  checklist,
  onToggleChecklistItem,
  businessProfile,
  onOpenDraftReminder,
  onOpenSSTFiling
}) => {
  const completedCount = checklist.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-6 select-none">
      {/* Quick Action Pills Row */}
      <section 
        id="quick-actions-bar"
        className="glass-card bg-slate-900/60 p-2.5 md:p-3 rounded-2xl shadow-level-1 border border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
      >
        <button
          id="action-create-invoice"
          onClick={onOpenNewInvoice}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-800/60 text-slate-200 border border-transparent hover:border-indigo-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-500/25 group-hover:scale-105 transition-all text-indigo-400">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300">Create Invoice</span>
        </button>

        <button
          id="action-add-expense"
          onClick={() => onNavigateTab('expenses')}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-800/60 text-slate-200 border border-transparent hover:border-indigo-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/25 group-hover:scale-105 transition-all text-purple-400">
            <Receipt className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-purple-300">Add Expense</span>
        </button>

        <button
          id="action-upload-receipt"
          onClick={onOpenReceiptScan}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-800/60 text-slate-200 border border-transparent hover:border-indigo-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/25 group-hover:scale-105 transition-all text-cyan-400">
            <ScanLine className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">Upload Receipt</span>
        </button>

        <button
          id="action-connect-bank"
          onClick={() => onNavigateTab('bank')}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-800/60 text-slate-200 border border-transparent hover:border-indigo-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/25 group-hover:scale-105 transition-all text-emerald-400">
            <Landmark className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">Connect Bank</span>
        </button>

        <button
          id="action-generate-report"
          onClick={() => onNavigateTab('reports')}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-800/60 text-slate-200 border border-transparent hover:border-indigo-500/30 group transition-all col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center group-hover:bg-pink-500/25 group-hover:scale-105 transition-all text-pink-400">
            <BarChart2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-pink-300">Generate Report</span>
        </button>
      </section>

      {/* Metrics Row (4 Bento Summary Cards with Sparklines) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Revenue */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight">
              RM 128,430
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+12%</span>
              <span className="text-slate-500 font-normal">vs last month</span>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="sparkline-green"></div>
          </div>
        </div>

        {/* Metric 2: Total Expenses */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 flex flex-col justify-between relative overflow-hidden group hover:border-rose-500/50 hover:shadow-rose-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Expenses</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight">
              RM 68,210
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+5%</span>
              <span className="text-slate-500 font-normal">vs last month</span>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="sparkline-red"></div>
          </div>
        </div>

        {/* Metric 3: Net Profit */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Net Profit</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent tracking-tight">
              RM 60,220
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+15%</span>
              <span className="text-slate-500 font-normal">vs last month</span>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="sparkline-green"></div>
          </div>
        </div>

        {/* Metric 4: Cash Balance */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cash Balance</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight">
              RM 45,600
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+2%</span>
              <span className="text-slate-500 font-normal">vs last month</span>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="sparkline-green"></div>
          </div>
        </div>
      </section>

      {/* Main Charts Area (2 Column Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Bar Chart */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 md:p-6 shadow-level-1 border border-slate-800/80 flex flex-col justify-between h-[340px]">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-100">Income vs Expenses</h3>
              <p className="text-xs text-slate-400">First Half 2024 (Jan - Jun)</p>
            </div>
            <button 
              onClick={() => onNavigateTab('reports')}
              className="text-slate-400 hover:text-indigo-400 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <IncomeVsExpensesChart />
          </div>
        </div>

        {/* Expense Breakdown Donut Chart */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 md:p-6 shadow-level-1 border border-slate-800/80 flex flex-col justify-between h-[340px]">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-100">Expense Breakdown</h3>
              <p className="text-xs text-slate-400">Operating Cost Distribution</p>
            </div>
            <button 
              onClick={() => onNavigateTab('expenses')}
              className="text-slate-400 hover:text-indigo-400 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full relative flex items-center justify-center">
            <ExpenseBreakdownDonut />
          </div>
        </div>
      </section>

      {/* Bottom Row: To-Do & Alerts + Getting Started Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* To-Do & Alerts */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 md:p-6 shadow-level-1 border-l-4 border-l-rose-500 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base md:text-lg text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>To-Do & Alerts</span>
              </h3>
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                2 Actions Pending
              </span>
            </div>

            <ul className="space-y-3">
              {/* Alert 1 */}
              <li 
                onClick={() => onNavigateTab('invoices')}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 cursor-pointer hover:bg-rose-500/15 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 mt-0.5 flex-shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs md:text-sm text-slate-200 group-hover:text-rose-300">3 Overdue Invoices (RM 5,600)</h4>
                    <span className="text-[11px] text-rose-400 font-semibold flex items-center gap-0.5">
                      Review <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Apex Marketing & Aiman Events require follow-up to maintain healthy cashflow.
                  </p>
                </div>
              </li>

              {/* Alert 2 */}
              <li 
                onClick={onOpenSSTFiling}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 cursor-pointer hover:bg-indigo-500/15 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mt-0.5 flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs md:text-sm text-slate-200 group-hover:text-indigo-300">SST Submission Due in 15 days</h4>
                    <span className="text-[11px] text-indigo-400 font-semibold flex items-center gap-0.5">
                      Draft SST-02 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Review preliminary Q2 report (Net SST Due: RM 21,600).
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Getting Started Checklist */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 md:p-6 shadow-level-1 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-base md:text-lg text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span>Getting Started</span>
              </h3>
              <span className="text-xs font-bold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-full">
                {completedCount}/{checklist.length} Done
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 h-2 rounded-full mb-4 overflow-hidden border border-slate-700/50">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Checklist Items */}
            <ul className="space-y-2">
              {checklist.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onToggleChecklistItem(item.id)}
                  className={`flex items-center gap-3 p-2 rounded-xl text-xs md:text-sm cursor-pointer transition-all ${
                    item.completed
                      ? 'text-slate-500 line-through bg-slate-950/30'
                      : 'text-slate-200 hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  )}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
