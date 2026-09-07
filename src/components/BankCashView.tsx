import React from 'react';
import { Landmark, Plus } from 'lucide-react';

export const BankCashView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bank & Cash Accounts</h1>
        <p className="text-sm text-slate-500">Connect a bank feed or add a cash account to track balances.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4">
          <Landmark className="w-7 h-7" />
        </div>
        <h3 className="font-bold text-lg text-slate-900">No accounts connected yet</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          Connect a bank feed or add a cash account to see balances and reconcile transactions here.
        </p>
        <button className="mt-5 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl">
          <Plus className="w-4 h-4" /> Connect Bank Feed
        </button>
        <p className="text-xs text-slate-400 mt-3">Bank integrations coming soon.</p>
      </div>
    </div>
  );
};