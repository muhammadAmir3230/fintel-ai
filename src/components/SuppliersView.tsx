import React from 'react';
import { Boxes, Plus } from 'lucide-react';

export const SuppliersView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Suppliers &amp; Vendors</h1>
          <p className="text-sm text-slate-500">Manage vendor accounts, procurement terms, and trade payables.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl">
          <Plus className="w-4 h-4" /> Add New Supplier
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4">
          <Boxes className="w-7 h-7" />
        </div>
        <h3 className="font-bold text-lg text-slate-900">No suppliers yet</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          Add your vendors to track procurement terms and payables here.
        </p>
        <p className="text-xs text-slate-400 mt-3">Supplier management coming soon.</p>
      </div>
    </div>
  );
};