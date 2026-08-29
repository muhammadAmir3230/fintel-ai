import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Clock, 
  Search, 
  Calendar, 
  Download, 
  Plus, 
  Flag, 
  Car, 
  Wifi, 
  Zap, 
  CreditCard, 
  Coffee, 
  Wrench, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  X
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsViewProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
  onResolveFlagged: (id: string) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onAddTransaction,
  onResolveFlagged
}) => {
  const [filterType, setFilterType] = useState<'all' | 'inflow' | 'outflow' | 'flagged'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // New Transaction Form State
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'inflow' | 'outflow'>('outflow');
  const [newCategory, setNewCategory] = useState('Utilities');
  const [newAccount, setNewAccount] = useState('Maybank - 4321');

  // Summary Metrics calculations
  const totalInflow = transactions
    .filter((t) => t.type === 'inflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = transactions
    .filter((t) => t.type === 'outflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingCount = transactions.filter((t) => t.status === 'pending' || t.status === 'flagged').length;

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'inflow' && t.type !== 'inflow') return false;
    if (filterType === 'outflow' && t.type !== 'outflow') return false;
    if (filterType === 'flagged' && t.status !== 'flagged') return false;
    if (searchQuery) {
      const match = 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.account.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'car':
        return <Car className="w-4 h-4 text-[#416656]" />;
      case 'wifi':
        return <Wifi className="w-4 h-4 text-[#416656]" />;
      case 'bolt':
        return <Zap className="w-4 h-4 text-[#006c49]" />;
      case 'coffee':
        return <Coffee className="w-4 h-4 text-[#006c49]" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-[#416656]" />;
      case 'payment':
      default:
        return <CreditCard className="w-4 h-4 text-[#006c49]" />;
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;

    onAddTransaction({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: newDesc,
      category: newCategory,
      account: newAccount,
      status: 'completed',
      amount: parseFloat(newAmount),
      type: newType,
      iconType: newType === 'inflow' ? 'payment' : 'coffee'
    });

    setNewDesc('');
    setNewAmount('');
    setShowAddModal(false);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Date,Description,Category,Account,Status,Type,Amount", 
        ...transactions.map(t => `"${t.date}","${t.description}","${t.category}","${t.account}","${t.status}","${t.type}",${t.amount}`)
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Fintel_Transactions_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight">Transactions</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Manage and review your recent financial activity.</p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3.5 py-2 glass-card bg-slate-900/80 border border-slate-800 rounded-xl hover:bg-slate-800 text-xs font-semibold text-slate-200 shadow-sm transition-all">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>This Month</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 glass-card bg-slate-900/80 border border-slate-800 rounded-xl hover:bg-slate-800 text-xs font-semibold text-slate-200 shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Inflow */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 flex flex-col justify-between h-32 group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Inflow</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
          <div className="font-bold text-2xl md:text-3xl text-emerald-400 tracking-tight">
            RM {totalInflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* Total Outflow */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 flex flex-col justify-between h-32 group hover:border-rose-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Outflow</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ArrowUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-bold text-2xl md:text-3xl text-rose-400 tracking-tight">
            RM {totalOutflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* Pending Review */}
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 flex flex-col justify-between h-32 group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Review</span>
            <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight flex items-baseline gap-2">
            <span>{pendingCount}</span>
            <span className="text-xs font-normal text-slate-400">Transactions</span>
          </div>
        </div>
      </div>

      {/* Flagged Banner if any */}
      {transactions.some(t => t.status === 'flagged') && (
        <div className="glass-card bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">2 Potential Duplicate Charges Flagged by Copilot</h4>
              <p className="text-xs text-slate-400 mt-0.5">Specialty Beans Wholesale charged RM 1,200.00 twice on Jun 08, 2023.</p>
            </div>
          </div>
          <button 
            onClick={() => setFilterType('flagged')}
            className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition-all whitespace-nowrap shadow-sm"
          >
            Review Flagged
          </button>
        </div>
      )}

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('inflow')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterType === 'inflow'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilterType('outflow')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterType === 'outflow'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setFilterType('flagged')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filterType === 'flagged'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Flagged ({transactions.filter(t => t.status === 'flagged').length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search description, account..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-1.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card bg-slate-900/60 rounded-2xl shadow-level-1 border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Account</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Amount</th>
                <th className="px-6 py-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs md:text-sm text-slate-200">
              {filteredTransactions.map((tx) => {
                const isInflow = tx.type === 'inflow';
                const isFlagged = tx.status === 'flagged';
                return (
                  <tr
                    key={tx.id}
                    className={`hover:bg-slate-800/40 transition-colors group cursor-pointer ${
                      isFlagged ? 'bg-rose-500/5' : ''
                    }`}
                    onClick={() => setSelectedTx(tx)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center flex-shrink-0 text-slate-300">
                        {getCategoryIcon(tx.iconType)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-100 block truncate">{tx.description}</span>
                        {tx.flagReason && (
                          <span className="text-[10px] text-rose-400 block truncate font-medium">
                            ⚠️ {tx.flagReason}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-lg text-xs font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {tx.account}
                    </td>
                    <td className="px-6 py-4">
                      {tx.status === 'completed' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                          Completed
                        </span>
                      )}
                      {tx.status === 'pending' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                          Pending
                        </span>
                      )}
                      {tx.status === 'flagged' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                          Duplicate Alert
                        </span>
                      )}
                    </td>
                    <td className={`px-6 py-4 text-right font-bold text-sm ${
                      isInflow ? 'text-emerald-400' : 'text-slate-100'
                    }`}>
                      {isInflow ? '+ ' : '- '}RM {tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      {isFlagged ? (
                        <button
                          onClick={() => onResolveFlagged(tx.id)}
                          className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm"
                        >
                          Resolve
                        </button>
                      ) : (
                        <button 
                          onClick={() => setSelectedTx(tx)}
                          className="text-slate-400 hover:text-indigo-400 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card bg-slate-900/95 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transaction Details</span>
                <h3 className="font-bold text-lg text-slate-100 mt-0.5">{selectedTx.description}</h3>
              </div>
              <button 
                onClick={() => setSelectedTx(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs md:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Amount:</span>
                <span className={`font-bold text-base ${selectedTx.type === 'inflow' ? 'text-emerald-400' : 'text-slate-100'}`}>
                  {selectedTx.type === 'inflow' ? '+' : '-'} RM {selectedTx.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Date:</span>
                <span className="font-semibold text-slate-200">{selectedTx.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-slate-200">{selectedTx.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Account:</span>
                <span className="font-semibold text-slate-200">{selectedTx.account}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold uppercase text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedTx.status}
                </span>
              </div>

              {selectedTx.flagReason && (
                <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                  <p className="font-bold">AI Flag Notice:</p>
                  <p className="mt-0.5">{selectedTx.flagReason}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              {selectedTx.status === 'flagged' && (
                <button
                  onClick={() => {
                    onResolveFlagged(selectedTx.id);
                    setSelectedTx(null);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Unflag & Verify
                </button>
              )}
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-700 border border-slate-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card bg-slate-900/95 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg text-slate-100">Record New Transaction</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="py-4 space-y-4 text-xs md:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Transaction Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('outflow')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      newType === 'outflow' ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    Expense (Outflow)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('inflow')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      newType === 'inflow' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    Income (Inflow)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="e.g., Coffee Roaster Machinery Refit"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Amount (RM)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-indigo-500 outline-none"
                  >
                    <option value="Sales">Sales Revenue</option>
                    <option value="Inventory">Inventory / Supplies</option>
                    <option value="Utilities">Utilities & Rent</option>
                    <option value="Travel">Travel & Grab</option>
                    <option value="Salaries">Payroll / Staff</option>
                    <option value="Software">Software & SaaS</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Bank Account</label>
                <select
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-indigo-500 outline-none"
                >
                  <option value="Maybank - 4321">Maybank Premier (Current Acct - 4321)</option>
                  <option value="CIMB - 8812">CIMB BizChannel (8812)</option>
                  <option value="Touch n Go eWallet">Touch 'n Go Business Merchant</option>
                  <option value="Cash Drawer">Physical Store Cash Drawer</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-700 border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
