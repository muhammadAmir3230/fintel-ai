import React from 'react';
import { Boxes, Plus, Search, Phone, Mail, AlertTriangle } from 'lucide-react';

export const SuppliersView: React.FC = () => {
  const suppliers = [
    { name: 'Specialty Coffee Roasters Subang', item: 'Green & Roasted Coffee Beans', paymentTerms: 'Net 14', monthlyAvg: 4500.00, status: 'Active (1 Duplicate Flagged)' },
    { name: 'Farm Fresh Milk Sdn Bhd', item: 'Barista Milk & Dairy Products', paymentTerms: 'Weekly COD', monthlyAvg: 2800.00, status: 'Active' },
    { name: 'Golden Bakery Supplies', item: 'Flour, Pastries, Packaging', paymentTerms: 'Net 30', monthlyAvg: 1950.00, status: 'Active' },
    { name: 'Tenaga Nasional Berhad (TNB)', item: 'Commercial Electricity Utility', paymentTerms: 'Monthly Due 15th', monthlyAvg: 420.00, status: 'Auto-Debit' },
  ];

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">Suppliers & Vendors</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">Manage vendor accounts, procurement terms, and trade payables.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all">
          <Plus className="w-4 h-4" />
          <span>Add New Supplier</span>
        </button>
      </div>

      <div className="glass-card bg-white/60 rounded-2xl shadow-level-1 border border-gray-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/60 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-gray-200/80">
                <th className="px-6 py-3.5">Vendor Name</th>
                <th className="px-6 py-3.5">Supplied Goods/Services</th>
                <th className="px-6 py-3.5">Terms</th>
                <th className="px-6 py-3.5 text-right">Monthly Spend</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs md:text-sm text-slate-600">
              {suppliers.map((s) => (
                <tr key={s.name} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{s.name}</td>
                  <td className="px-6 py-4 text-slate-600">{s.item}</td>
                  <td className="px-6 py-4 text-slate-600">{s.paymentTerms}</td>
                  <td className="px-6 py-4 text-right font-bold text-rose-400">RM {s.monthlyAvg.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {s.status}
                    </span>
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
