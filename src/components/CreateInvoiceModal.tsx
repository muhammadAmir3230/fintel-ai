import React, { useState } from 'react';
import { Plus, Trash2, X, Calculator, Check, FileText } from 'lucide-react';
import { Invoice, InvoiceItem } from '../types';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveInvoice: (invoice: Invoice) => void;
  nextInvoiceNumber: string;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
  onSaveInvoice,
  nextInvoiceNumber
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [issueDate, setIssueDate] = useState(
    new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  );
  const [dueDate, setDueDate] = useState('Nov 15, 2023');
  const [notes, setNotes] = useState('Payment due within 14 days. Bank transfer to Maybank 5140-1234-4321.');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Artisan Espresso Beans (50kg)', quantity: 1, unitPrice: 1500, taxRate: 6, total: 1590 }
  ]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: 'New Line Item',
        quantity: 1,
        unitPrice: 100,
        taxRate: 6,
        total: 106
      }
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        const base = (Number(updated.quantity) || 0) * (Number(updated.unitPrice) || 0);
        const tax = base * ((Number(updated.taxRate) || 0) / 100);
        updated.total = base + tax;
        return updated;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalTax = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * (item.taxRate / 100)), 0);
  const grandTotal = subtotal + totalTax;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'C';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: nextInvoiceNumber,
      customerName,
      customerInitials: getInitials(customerName),
      customerEmail,
      date: issueDate,
      dueDate,
      amount: grandTotal,
      status: 'pending',
      type: 'standard',
      items,
      notes
    };

    onSaveInvoice(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in select-none">
      <div className="glass-panel bg-slate-900/95 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start pb-4 border-b border-slate-800/80">
          <div>
            <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 rounded-full uppercase">
              New Sales Invoice
            </span>
            <h3 className="font-bold text-2xl text-slate-100 mt-1.5">{nextInvoiceNumber}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-6 text-xs md:text-sm">
          {/* Customer & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Customer / Client Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Apex Marketing Sdn Bhd"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Customer Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="finance@client.com.my"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Issue Date</label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Due Date</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300">Line Items & SST</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      placeholder="Qty"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-1.5 text-xs text-center text-slate-100 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      placeholder="Price"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-1.5 text-xs text-right text-slate-100 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={item.taxRate}
                      onChange={(e) => handleUpdateItem(item.id, 'taxRate', parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-1.5 text-xs text-slate-200 focus:border-indigo-500 outline-none"
                    >
                      <option value={6} className="bg-slate-900 text-slate-200">6% (Svc)</option>
                      <option value={10} className="bg-slate-900 text-slate-200">10% (Goods)</option>
                      <option value={0} className="bg-slate-900 text-slate-200">0% (Exempt)</option>
                    </select>
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculations Summary */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-slate-200">RM {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SST Tax:</span>
                <span className="text-slate-200">RM {totalTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-100 pt-2 border-t border-slate-800">
                <span>Grand Total:</span>
                <span className="text-emerald-400 font-bold">RM {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Payment Instructions & Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800/80 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
            >
              Create & Send Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
