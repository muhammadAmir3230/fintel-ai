import React from 'react';
import { Plus } from 'lucide-react';
import { Invoice } from '../types';

interface CustomersViewProps {
  invoices: Invoice[];
  onOpenNewInvoice: () => void;
}

const money = (n: number) => 'RM ' + n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const CustomersView: React.FC<CustomersViewProps> = ({ invoices, onOpenNewInvoice }) => {
  // Build the customer directory from real invoices
  const map: Record<string, { name: string; email: string; totalInvoiced: number; outstanding: number; overdue: boolean; pending: boolean }> = {};
  invoices.forEach((inv) => {
    const key = inv.customerName || 'Unknown';
    if (!map[key]) map[key] = { name: key, email: inv.customerEmail || '', totalInvoiced: 0, outstanding: 0, overdue: false, pending: false };
    map[key].totalInvoiced += inv.amount;
    if (inv.status !== 'paid') map[key].outstanding += inv.amount;
    if (inv.status === 'overdue') map[key].overdue = true;
    if (inv.status === 'pending') map[key].pending = true;
    if (!map[key].email && inv.customerEmail) map[key].email = inv.customerEmail;
  });
  const customers = Object.values(map).sort((a, b) => b.totalInvoiced - a.totalInvoiced);
  const totalReceivables = customers.reduce((s, c) => s + c.outstanding, 0);
  const overdueTotal = invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);
  const statusOf = (c: typeof customers[number]) => (c.overdue ? 'Overdue' : c.pending ? 'Pending Due' : 'Good Standing');

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">Customer Directory</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">Manage debtor relationships, payment history, and credit terms.</p>
        </div>
        <button
          onClick={onOpenNewInvoice}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Customer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Active Clients</span>
          <div className="font-bold text-2xl md:text-3xl text-slate-900 mt-2">{customers.length} {customers.length === 1 ? 'Business' : 'Businesses'}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Receivables</span>
          <div className="font-bold text-2xl md:text-3xl text-emerald-600 mt-2">{money(totalReceivables)}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">Overdue Accounts</span>
          <div className="font-bold text-2xl md:text-3xl text-rose-500 mt-2">{money(overdueTotal)}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-3.5">Customer Name</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5 text-right">Total Invoiced</th>
                <th className="px-6 py-3.5 text-right">Outstanding</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs md:text-sm text-slate-700">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No customers yet. Create an invoice and your customers will appear here.
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  const status = statusOf(c);
                  return (
                    <tr key={c.name} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{c.email || '—'}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-700">{money(c.totalInvoiced)}</td>
                      <td className={`px-6 py-4 text-right font-bold ${c.outstanding > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>{money(c.outstanding)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          status === 'Overdue' ? 'bg-rose-500/20 text-rose-600 border-rose-500/30'
                          : status === 'Pending Due' ? 'bg-amber-500/20 text-amber-600 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30'
                        }`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};