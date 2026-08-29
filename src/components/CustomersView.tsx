import React from 'react';
import { Users, Plus, Search, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Invoice } from '../types';

interface CustomersViewProps {
  invoices: Invoice[];
  onOpenNewInvoice: () => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ invoices, onOpenNewInvoice }) => {
  const customers = [
    { name: 'Tech Solution Ltd', contact: 'Mr. Tan', email: 'finance@techsolutions.com.my', phone: '+60 12-345 6789', totalSpend: 7000.00, outstanding: 0.00, status: 'Good Standing' },
    { name: 'Maju Trading Sdn Bhd', contact: 'Puan Siti', email: 'procurement@majutrading.com', phone: '+60 19-876 5432', totalSpend: 8900.00, outstanding: 8900.00, status: 'Pending Due' },
    { name: 'Apex Marketing', contact: 'Alex Wong', email: 'billing@apexmarketing.my', phone: '+60 17-223 9988', totalSpend: 3200.00, outstanding: 3200.00, status: 'Overdue' },
    { name: 'Nexus Design Studio', contact: 'Sarah Lim', email: 'admin@nexusstudio.io', phone: '+60 11-5544 3322', totalSpend: 950.00, outstanding: 950.00, status: 'Recurring' },
    { name: 'Sunrise Bakery', contact: 'Uncle Chong', email: 'accounts@sunrisebakery.com.my', phone: '+60 16-998 1122', totalSpend: 420.00, outstanding: 0.00, status: 'Good Standing' },
  ];

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-100 tracking-tight">Customer Directory</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Manage debtor relationships, payment history, and credit terms.</p>
        </div>
        <button
          onClick={onOpenNewInvoice}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Customer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 group hover:border-indigo-500/50 transition-all">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Active Clients</span>
          <div className="font-bold text-2xl md:text-3xl text-slate-100 mt-2">14 Businesses</div>
        </div>
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 group hover:border-emerald-500/50 transition-all">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Receivables</span>
          <div className="font-bold text-2xl md:text-3xl text-emerald-400 mt-2">RM 22,800.00</div>
        </div>
        <div className="glass-card bg-slate-900/60 rounded-2xl p-5 shadow-level-1 border border-slate-800/80 group hover:border-rose-500/50 transition-all">
          <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Overdue Accounts</span>
          <div className="font-bold text-2xl md:text-3xl text-rose-400 mt-2">RM 5,600.00</div>
        </div>
      </div>

      <div className="glass-card bg-slate-900/60 rounded-2xl shadow-level-1 border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                <th className="px-6 py-3.5">Customer Name</th>
                <th className="px-6 py-3.5">Contact Person</th>
                <th className="px-6 py-3.5">Email & Phone</th>
                <th className="px-6 py-3.5 text-right">Total Invoiced</th>
                <th className="px-6 py-3.5 text-right">Outstanding</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs md:text-sm text-slate-200">
              {customers.map((c) => (
                <tr key={c.name} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-100">{c.name}</td>
                  <td className="px-6 py-4 text-slate-300">{c.contact}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    <div>{c.email}</div>
                    <div className="text-[11px] text-slate-500">{c.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-200">RM {c.totalSpend.toFixed(2)}</td>
                  <td className={`px-6 py-4 text-right font-bold ${c.outstanding > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    RM {c.outstanding.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      c.status === 'Overdue' 
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
                        : c.status === 'Pending Due'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {c.status}
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
