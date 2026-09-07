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
  const money = (n: number) => 'RM ' + n.toLocaleString('en-MY', { maximumFractionDigits: 0 });
  const paidInvoices = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const inflow = transactions.filter((t) => t.type === 'inflow').reduce((s, t) => s + t.amount, 0);
  const outflow = transactions.filter((t) => t.type === 'outflow').reduce((s, t) => s + t.amount, 0);
  const totalRevenue = paidInvoices + inflow;
  const totalExpenses = outflow;
  const netProfit = totalRevenue - totalExpenses;
  const cashBalance = totalRevenue - totalExpenses;
  const overdueInvoices = invoices.filter((i) => i.status === 'overdue');
  const overdueTotal = overdueInvoices.reduce((s, i) => s + i.amount, 0);

    // ---- chart data from real transactions/invoices ----
  const _now = new Date();
  const _months = Array.from({ length: 6 }, (_, i) => {
    const dt = new Date(_now.getFullYear(), _now.getMonth() - (5 - i), 1);
    return { key: dt.toLocaleString('en-US', { month: 'short' }), income: 0, expenses: 0 };
  });
  const _idx = (d: Date) => 5 - ((_now.getFullYear() - d.getFullYear()) * 12 + (_now.getMonth() - d.getMonth()));
  transactions.forEach((t) => {
    const d = new Date(t.date); if (isNaN(d.getTime())) return;
    const i = _idx(d); if (i < 0 || i > 5) return;
    if (t.type === 'inflow') _months[i].income += t.amount; else _months[i].expenses += t.amount;
  });
  invoices.filter((i) => i.status === 'paid').forEach((inv) => {
    const d = new Date(inv.date); if (isNaN(d.getTime())) return;
    const i = _idx(d); if (i < 0 || i > 5) return;
    _months[i].income += inv.amount;
  });
  const monthly = _months.map((m) => ({ month: m.key, income: m.income, expenses: m.expenses }));

  const _palette = ['#10b981', '#2563eb', '#a855f7', '#f43f5e', '#38bdf8', '#f59e0b'];
  const _catMap: Record<string, number> = {};
  transactions.filter((t) => t.type === 'outflow').forEach((t) => { _catMap[t.category] = (_catMap[t.category] || 0) + t.amount; });
  const _catEntries = Object.entries(_catMap).sort((a, b) => b[1] - a[1]);
  const _catTotal = _catEntries.reduce((s, [, v]) => s + v, 0);
  const expenseData = _catEntries.map(([name, amount], i) => ({
    name, amount, value: _catTotal ? Math.round((amount / _catTotal) * 100) : 0, color: _palette[i % _palette.length],
  }));


  return (
    <div className="space-y-6 select-none">
      {/* Quick Action Pills Row */}
      <section 
        id="quick-actions-bar"
        className="glass-card bg-white/60 p-2.5 md:p-3 rounded-2xl shadow-level-1 border border-gray-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
      >
        <button
          id="action-create-invoice"
          onClick={onOpenNewInvoice}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-gray-50/60 text-slate-600 border border-transparent hover:border-emerald-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/25 group-hover:scale-105 transition-all text-emerald-400">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-300">Create Invoice</span>
        </button>

        <button
          id="action-add-expense"
          onClick={() => onNavigateTab('expenses')}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-gray-50/60 text-slate-600 border border-transparent hover:border-emerald-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/25 group-hover:scale-105 transition-all text-emerald-400">
            <Receipt className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-300">Add Expense</span>
        </button>

        <button
          id="action-upload-receipt"
          onClick={onOpenReceiptScan}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-gray-50/60 text-slate-600 border border-transparent hover:border-emerald-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/25 group-hover:scale-105 transition-all text-cyan-400">
            <ScanLine className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-600 group-hover:text-cyan-300">Upload Receipt</span>
        </button>

        <button
          id="action-connect-bank"
          onClick={() => onNavigateTab('bank')}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-gray-50/60 text-slate-600 border border-transparent hover:border-emerald-500/30 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/25 group-hover:scale-105 transition-all text-emerald-400">
            <Landmark className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-300">Connect Bank</span>
        </button>

        <button
          id="action-generate-report"
          onClick={() => onNavigateTab('reports')}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-gray-50/60 text-slate-600 border border-transparent hover:border-emerald-500/30 group transition-all col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center group-hover:bg-pink-500/25 group-hover:scale-105 transition-all text-pink-400">
            <BarChart2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-600 group-hover:text-pink-300">Generate Report</span>
        </button>
      </section>

      {/* Metrics Row (4 Bento Summary Cards with Sparklines) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Revenue */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
            {money(totalRevenue)}
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
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between relative overflow-hidden group hover:border-rose-500/50 hover:shadow-rose-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Total Expenses</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
              {money(totalExpenses)}
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
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Net Profit</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-slate-900 tracking-tight">
              {money(netProfit)}
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
        <div className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Cash Balance</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
              {money(cashBalance)}
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
        <div className="glass-card bg-white/60 rounded-2xl p-5 md:p-6 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-[340px]">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-800">Income vs Expenses</h3>
              <p className="text-xs text-slate-600">First Half 2024 (Jan - Jun)</p>
            </div>
            <button 
              onClick={() => onNavigateTab('reports')}
              className="text-slate-600 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-gray-50/60 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <IncomeVsExpensesChart data={monthly} />
          </div>
        </div>

        {/* Expense Breakdown Donut Chart */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 md:p-6 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-[340px]">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-800">Expense Breakdown</h3>
              <p className="text-xs text-slate-600">Operating Cost Distribution</p>
            </div>
            <button 
              onClick={() => onNavigateTab('expenses')}
              className="text-slate-600 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-gray-50/60 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full relative flex items-center justify-center">
            <ExpenseBreakdownDonut data={expenseData} total={totalExpenses} />
          </div>
        </div>
      </section>

      {/* Bottom Row: To-Do & Alerts + Getting Started Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* To-Do & Alerts */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 md:p-6 shadow-level-1 border-l-4 border-l-rose-500 border border-gray-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2">
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
                    <h4 className="font-bold text-xs md:text-sm text-slate-600 group-hover:text-rose-300">{overdueInvoices.length} Overdue Invoices ({money(overdueTotal)})</h4>
                    <span className="text-[11px] text-rose-400 font-semibold flex items-center gap-0.5">
                      Review <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Apex Marketing & Aiman Events require follow-up to maintain healthy cashflow.
                  </p>
                </div>
              </li>

              {/* Alert 2 */}
              <li 
                onClick={onOpenSSTFiling}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/15 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5 flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs md:text-sm text-slate-600 group-hover:text-emerald-300">Keep your SST records up to date</h4>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      Draft SST-02 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Review your SST once your sales and expenses are in.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Getting Started Checklist */}
        <div className="glass-card bg-white/60 rounded-2xl p-5 md:p-6 shadow-level-1 border border-gray-200/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Getting Started</span>
              </h3>
              <span className="text-xs font-bold bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-full">
                {completedCount}/{checklist.length} Done
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-50/80 h-2 rounded-full mb-4 overflow-hidden border border-gray-200/50">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm"
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
                      ? 'text-slate-500 line-through bg-white/30'
                      : 'text-slate-600 hover:bg-gray-50/60 font-medium'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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
