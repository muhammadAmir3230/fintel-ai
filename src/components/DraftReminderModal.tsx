import React, { useState } from 'react';
import { Mail, Send, X, Sparkles, Check, Clock } from 'lucide-react';
import { Invoice } from '../types';

interface DraftReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSendSuccess: (invoiceId: string) => void;
}

export const DraftReminderModal: React.FC<DraftReminderModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onSendSuccess
}) => {
  if (!isOpen || !invoice) return null;

  const [recipient, setRecipient] = useState(invoice.customerEmail || `${invoice.customerName.toLowerCase().replace(/\s+/g, '')}@company.my`);
  const [subject, setSubject] = useState(`Payment Reminder: Invoice ${invoice.invoiceNumber} - Aiman's Cafe`);
  const [body, setBody] = useState(
    `Dear ${invoice.customerName},\n\nWe hope this email finds you well.\n\nThis is a friendly reminder that invoice ${invoice.invoiceNumber} for the amount of RM ${invoice.amount.toFixed(2)} was due on ${invoice.dueDate}.\n\nIf you have already processed this payment, please disregard this notice. Otherwise, please remit payment via Maybank transfer (Acct: 5140-1234-4321).\n\nThank you for your valued business!\n\nWarm regards,\nAiman\nAiman's Cafe`
  );
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        onSendSuccess(invoice.id);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in select-none">
      <div className="glass-panel bg-white/95 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 relative">
        <div className="flex justify-between items-start pb-4 border-b border-gray-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">AI Copilot Payment Reminder</h3>
              <p className="text-xs text-slate-600">Drafted for {invoice.customerName} ({invoice.invoiceNumber})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-600 hover:text-slate-600 hover:bg-gray-50 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSend} className="py-4 space-y-4 text-xs md:text-sm">
          <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-300">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>This invoice is currently overdue (Due: {invoice.dueDate}, Amount: RM {invoice.amount.toFixed(2)})</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">To:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-white/70 border border-gray-200 rounded-xl p-2.5 text-xs text-slate-800 focus:border-emerald-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white/70 border border-gray-200 rounded-xl p-2.5 text-xs text-slate-800 focus:border-emerald-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Message Body:</label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-white/70 border border-gray-200 rounded-xl p-3 text-xs leading-relaxed text-slate-600 focus:border-emerald-500 outline-none font-mono transition-colors"
            />
          </div>

          <div className="pt-3 border-t border-gray-200/80 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-slate-600 text-xs font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/25 transition-all active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Sending Reminder...' : 'Dispatch Reminder'}</span>
            </button>
          </div>
        </form>

        {sentSuccess && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mb-2">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="font-bold text-lg text-slate-800">Reminder Sent!</h4>
            <p className="text-xs text-slate-600">Customer has been notified via email.</p>
          </div>
        )}
      </div>
    </div>
  );
};
