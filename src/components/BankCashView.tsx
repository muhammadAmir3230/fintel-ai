import React, { useState } from 'react';
import { Landmark, Plus, ArrowUpRight, ArrowDownRight, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

export const BankCashView: React.FC = () => {
  const [isReconciling, setIsReconciling] = useState(false);
  const [reconciled, setReconciled] = useState(false);

  const accounts = [
    { name: 'Maybank Premier Current Account', number: '5140-1234-4321', balance: 42100.00, status: 'Synced' },
    { name: 'CIMB BizChannel Account', number: '8001-9923-8812', balance: 0.00, status: 'Active' },
    { name: 'Touch n Go eWallet Merchant', number: 'TNG-AIMAN-889', balance: 1450.00, status: 'Synced' },
    { name: 'Bangsar Cafe Cash Drawer', number: 'Cash Float Register', balance: 2050.00, status: 'Reconciled' },
  ];

  const handleReconcile = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      setReconciled(true);
      setTimeout(() => setReconciled(false), 3000);
    }, 1000);
  };

  const totalCash = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">Bank & Cash Accounts</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">Live bank feeds and daily cash drawer reconciliation.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReconcile}
            disabled={isReconciling}
            className="flex items-center gap-2 px-4 py-2 glass-card bg-white/80 border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-slate-600 rounded-xl shadow-sm transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${isReconciling ? 'animate-spin' : ''}`} />
            <span>{isReconciling ? 'Reconciling...' : 'Auto-Reconcile Feeds'}</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all">
            <Plus className="w-4 h-4" />
            <span>Connect Bank Feed</span>
          </button>
        </div>
      </div>

      {reconciled && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>All 4 accounts successfully matched and reconciled with Malaysian bank statements!</span>
        </div>
      )}

      {/* Cash Overview Bento */}
      <div className="glass-card bg-gradient-to-r from-emerald-950/40 via-white/60 to-emerald-950/40 border border-emerald-500/20 rounded-3xl p-6 shadow-level-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Total Liquid Cash Available</span>
          <div className="font-bold text-3xl md:text-4xl text-slate-800 mt-1">
            RM {totalCash.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-slate-600 mt-1">Sufficient for 4.2 months of regular operational overhead</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-white/60 px-3 py-2 rounded-xl shadow-sm text-cyan-300 font-semibold border border-cyan-500/30">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Bank-Grade 256-Bit SSL Feed</span>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {accounts.map((acc) => (
          <div key={acc.number} className="glass-card bg-white/60 rounded-2xl p-5 shadow-level-1 border border-gray-200/80 flex flex-col justify-between h-44 group hover:border-emerald-500/50 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/50 flex items-center justify-center text-emerald-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{acc.name}</h4>
                  <p className="text-xs text-slate-600">{acc.number}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full uppercase">
                {acc.status}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200/60 flex justify-between items-end">
              <div>
                <span className="text-[11px] text-slate-600 block">Book Balance</span>
                <span className="font-bold text-xl md:text-2xl text-slate-800">
                  RM {acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <button className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline">
                View Ledger &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
