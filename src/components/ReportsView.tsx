import React, { useState } from 'react';
import { BarChart3, Download, Printer, FileText, Calendar, TrendingUp } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [reportType, setReportType] = useState<'pnl' | 'balance_sheet' | 'cash_flow'>('pnl');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">Financial Reports</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">GAAP and Malaysian Financial Reporting Standards (MFRS) compliant statements.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 glass-card bg-white/80 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-slate-600 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => alert("Report downloaded in PDF format.")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:brightness-110 text-slate-900 rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Report Selector Pills */}
      <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-gray-200 w-fit">
        <button
          onClick={() => setReportType('pnl')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            reportType === 'pnl' ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-600 hover:bg-gray-50'
          }`}
        >
          Profit & Loss Statement
        </button>
        <button
          onClick={() => setReportType('balance_sheet')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            reportType === 'balance_sheet' ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-600 hover:bg-gray-50'
          }`}
        >
          Balance Sheet
        </button>
        <button
          onClick={() => setReportType('cash_flow')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            reportType === 'cash_flow' ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-600 hover:bg-gray-50'
          }`}
        >
          Cash Flow Statement
        </button>
      </div>

      {/* Report Sheet */}
      <div className="glass-card bg-white/70 rounded-3xl p-6 md:p-8 shadow-level-1 border border-gray-200/80 space-y-6 max-w-4xl">
        <div className="text-center pb-6 border-b border-gray-200/80">
          <h3 className="font-bold text-xl md:text-2xl text-slate-800">Aiman's Cafe Enterprise</h3>
          <p className="text-xs text-slate-600">SSM: 202301045678 (1523412-V) • Bangsar, Kuala Lumpur</p>
          <p className="font-semibold text-sm text-cyan-300 mt-2">
            {reportType === 'pnl' && 'Statement of Profit & Loss (For the period ended 30 June 2024)'}
            {reportType === 'balance_sheet' && 'Balance Sheet (As of 30 June 2024)'}
            {reportType === 'cash_flow' && 'Statement of Cash Flows (1 Jan 2024 - 30 Jun 2024)'}
          </p>
        </div>

        {reportType === 'pnl' && (
          <div className="space-y-4 text-xs md:text-sm text-slate-600">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2">Revenue</h4>
              <div className="space-y-1.5 pl-3 border-l-2 border-emerald-500">
                <div className="flex justify-between py-1">
                  <span>Cafe Sales & Dining Receipts</span>
                  <span className="font-semibold text-slate-800">RM 78,430.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Corporate Catering & Events</span>
                  <span className="font-semibold text-slate-800">RM 32,000.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Wholesale Specialty Beans</span>
                  <span className="font-semibold text-slate-800">RM 18,000.00</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-emerald-400">
                  <span>Total Operating Revenue</span>
                  <span>RM 128,430.00</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2">Cost of Goods Sold (COGS)</h4>
              <div className="space-y-1.5 pl-3 border-l-2 border-rose-500">
                <div className="flex justify-between py-1">
                  <span>Green Coffee Beans & Dairy Raw Materials</span>
                  <span>RM 13,642.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Packaging & Cold Brew Cans</span>
                  <span>RM 2,800.00</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-rose-400">
                  <span>Total COGS</span>
                  <span>RM 16,442.00</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white/60 border border-gray-200 rounded-xl flex justify-between font-bold text-sm text-slate-800">
              <span>Gross Profit (Margin: 87.2%)</span>
              <span className="text-emerald-400">RM 111,988.00</span>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2">Operating Expenses</h4>
              <div className="space-y-1.5 pl-3 border-l-2 border-slate-600">
                <div className="flex justify-between py-1">
                  <span>Salaries & Barista Payroll</span>
                  <span>RM 27,284.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Bangsar Outlet Rental</span>
                  <span>RM 17,052.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Digital Marketing & Local Ads</span>
                  <span>RM 6,821.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Utilities (Electricity TNB & Maxis Broadband)</span>
                  <span>RM 3,411.00</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-rose-400">
                  <span>Total Operating Expenses</span>
                  <span>RM 51,768.00</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/15 rounded-2xl border border-emerald-500/30 flex justify-between font-bold text-base text-emerald-300">
              <span>Net Operating Profit</span>
              <span className="text-xl text-emerald-400">RM 60,220.00</span>
            </div>
          </div>
        )}

        {reportType === 'balance_sheet' && (
          <div className="space-y-4 text-xs md:text-sm text-slate-600">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2">Current & Fixed Assets</h4>
              <div className="space-y-1.5 pl-3 border-l-2 border-emerald-500">
                <div className="flex justify-between py-1">
                  <span>Maybank Premier Operating Account</span>
                  <span>RM 42,100.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Cash Drawer & Petty Cash</span>
                  <span>RM 3,500.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Accounts Receivable (Customer Invoices)</span>
                  <span>RM 22,800.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Commercial Espresso Machines & Equipment</span>
                  <span>RM 85,000.00</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-emerald-400">
                  <span>Total Assets</span>
                  <span>RM 153,400.00</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2">Liabilities & Equity</h4>
              <div className="space-y-1.5 pl-3 border-l-2 border-rose-500">
                <div className="flex justify-between py-1">
                  <span>Net SST Payable (Royal Customs)</span>
                  <span>RM 21,600.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Accounts Payable (Coffee Bean Suppliers)</span>
                  <span>RM 4,500.00</span>
                </div>
                <div className="flex justify-between py-1 font-semibold text-slate-600">
                  <span>Owner's Equity & Retained Earnings</span>
                  <span>RM 127,300.00</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-slate-800">
                  <span>Total Liabilities & Equity</span>
                  <span>RM 153,400.00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'cash_flow' && (
          <div className="space-y-4 text-xs md:text-sm text-slate-600">
            <div className="p-3.5 bg-white/60 border border-gray-200 rounded-xl flex justify-between font-semibold text-slate-600">
              <span>Beginning Cash Balance (1 Jan 2024)</span>
              <span>RM 28,400.00</span>
            </div>
            <div className="flex justify-between py-1 pl-3 text-emerald-400 font-medium">
              <span>Cash Inflows from Operations</span>
              <span>+ RM 128,430.00</span>
            </div>
            <div className="flex justify-between py-1 pl-3 text-rose-400 font-medium">
              <span>Operating Disbursements & Salaries</span>
              <span>- RM 68,210.00</span>
            </div>
            <div className="flex justify-between py-1 pl-3 text-rose-400 font-medium">
              <span>Equipment Financing & Tax Payments</span>
              <span>- RM 43,020.00</span>
            </div>
            <div className="p-4 bg-emerald-500/15 rounded-2xl border border-emerald-500/30 flex justify-between font-bold text-base text-emerald-300">
              <span>Ending Cash Balance (30 Jun 2024)</span>
              <span className="text-xl text-emerald-400">RM 45,600.00</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
