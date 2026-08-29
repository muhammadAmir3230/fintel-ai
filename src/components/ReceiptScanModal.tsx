import React, { useState } from 'react';
import { ScanLine, UploadCloud, Check, X, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { Transaction } from '../types';

interface ReceiptScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExpenseAdded: (tx: Omit<Transaction, 'id'>) => void;
}

export const ReceiptScanModal: React.FC<ReceiptScanModalProps> = ({
  isOpen,
  onClose,
  onExpenseAdded
}) => {
  if (!isOpen) return null;

  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<{
    merchant: string;
    amount: number;
    tax: number;
    category: string;
    date: string;
  } | null>(null);

  const sampleReceipts = [
    { merchant: 'Tenaga Nasional Berhad', amount: 420.00, tax: 25.20, category: 'Utilities', date: 'Jun 12, 2024' },
    { merchant: 'Specialty Coffee Roasters Subang', amount: 850.00, tax: 51.00, category: 'Inventory', date: 'Jun 14, 2024' },
    { merchant: 'Maxis Broadband Sdn Bhd', amount: 189.00, tax: 11.34, category: 'Utilities', date: 'Jun 15, 2024' }
  ];

  const handleSimulateScan = (receiptIndex = 0) => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(sampleReceipts[receiptIndex]);
    }, 1200);
  };

  const handleConfirmAndRecord = () => {
    if (!scannedResult) return;
    onExpenseAdded({
      date: scannedResult.date,
      description: `${scannedResult.merchant} (Receipt OCR)`,
      category: scannedResult.category,
      account: 'Maybank - 4321',
      status: 'completed',
      amount: scannedResult.amount,
      type: 'outflow',
      iconType: scannedResult.category === 'Inventory' ? 'coffee' : 'bolt'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in select-none">
      <div className="glass-panel bg-slate-900/95 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-800 relative">
        <div className="flex justify-between items-start pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">AI Receipt Scanner (OCR)</h3>
              <p className="text-xs text-slate-400">Instant receipt digitizer & SST category extractor</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs md:text-sm">
          {!scannedResult && !isScanning && (
            <div
              onClick={() => handleSimulateScan(0)}
              className="border-2 border-dashed border-slate-700/80 hover:border-indigo-500 bg-slate-950/40 hover:bg-slate-950/70 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 shadow-sm flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm text-slate-200">Click to scan receipt</p>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, PDF receipts</p>
              <div className="mt-4 flex gap-2">
                <span className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-slate-400">Sample TNB Bill</span>
                <span className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-slate-400">Bean Invoice</span>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-bold text-sm text-slate-100">AI OCR is reading receipt data...</p>
              <p className="text-xs text-slate-400">Extracting merchant, tax registration & line totals</p>
            </div>
          )}

          {scannedResult && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                  <span>OCR Extraction Complete</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Merchant:</span>
                  <span className="font-bold text-slate-200">{scannedResult.merchant}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold text-slate-200">{scannedResult.date}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">{scannedResult.category}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">SST Included (6%):</span>
                  <span className="font-semibold text-slate-200">RM {scannedResult.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 border-t border-slate-800">
                  <span className="text-slate-200">Total Expense:</span>
                  <span className="text-rose-400">RM {scannedResult.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScannedResult(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  Rescan
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAndRecord}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Record to Expenses</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
