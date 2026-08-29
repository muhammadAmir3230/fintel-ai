import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  X, 
  ArrowRight, 
  Check, 
  FileText, 
  Lightbulb, 
  AlertTriangle,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { CopilotMessage, TabType, Invoice } from '../types';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: TabType;
  invoices: Invoice[];
  onNavigateTab: (tab: TabType) => void;
  onOpenDraftReminder: (invoiceId: string) => void;
  onOpenSSTFiling: () => void;
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  invoices,
  onNavigateTab,
  onOpenDraftReminder,
  onOpenSSTFiling
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hi Aiman! I'm your AI finance copilot. How can I help you grow your business today?",
      timestamp: 'Just now',
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update contextual greetings/prompts based on current tab
  useEffect(() => {
    if (currentTab === 'tax') {
      setMessages((prev) => {
        if (prev.some((m) => m.id === 'm-tax-init')) return prev;
        return [
          ...prev,
          {
            id: 'm-tax-init',
            sender: 'ai',
            text: "Hi Aiman. I noticed your Services Taxable Amount increased by 15% this quarter. Don't forget that your Q2 filing is due in 15 days (Jul 31, 2024). I've prepared a draft of your SST-02 form based on your recent invoices.",
            timestamp: 'Just now',
            suggestedActions: [
              { label: 'Explain my SST calculation', actionId: 'explain_sst' },
              { label: 'Review Draft SST-02 Form', actionId: 'review_sst_02' }
            ]
          }
        ];
      });
    } else if (currentTab === 'invoices') {
      setMessages((prev) => {
        if (prev.some((m) => m.id === 'm-inv-init')) return prev;
        return [
          ...prev,
          {
            id: 'm-inv-init',
            sender: 'ai',
            text: "Hi Aiman! I noticed you have 3 invoices that are more than 7 days overdue (Totaling RM 5,600.00). Would you like me to draft polite payment reminders for them?",
            timestamp: 'Just now',
            suggestedActions: [
              { label: 'Draft payment reminders', actionId: 'draft_reminders' },
              { label: 'View overdue report', actionId: 'overdue_report' },
              { label: 'Set up auto-follow-up', actionId: 'auto_followup' }
            ]
          }
        ];
      });
    } else if (currentTab === 'transactions') {
      setMessages((prev) => {
        if (prev.some((m) => m.id === 'm-tx-init')) return prev;
        return [
          ...prev,
          {
            id: 'm-tx-init',
            sender: 'ai',
            text: "Hi Aiman! I've flagged 2 transactions on Jun 8 from Specialty Beans that look like potential duplicates (RM 1,200 each). Would you like me to review them?",
            timestamp: 'Just now',
            suggestedActions: [
              { label: 'Review flagged items', actionId: 'review_duplicates' },
              { label: 'Categorize uncategorized', actionId: 'categorize' },
              { label: 'Find recurring subscriptions', actionId: 'find_recurring' }
            ]
          }
        ];
      });
    }
  }, [currentTab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: CopilotMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI response engine simulation with Malaysian SME accounting intelligence
    setTimeout(() => {
      let replyText = '';
      let suggestedActions: { label: string; actionId: string }[] | undefined = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('summarize') || lower.includes('finances') || lower.includes('overview')) {
        replyText = "Here is your quick financial summary for Aiman's Cafe:\n• Total Revenue: RM 128,430 (+12% vs last month)\n• Total Expenses: RM 68,210 (+5%)\n• Net Profit: RM 60,220 (Healthy 46.8% margin)\n• Cash Balance: RM 45,600 across Maybank and Cash Drawer\n• Receivables: RM 22,800 outstanding (RM 5,600 overdue).";
        suggestedActions = [
          { label: 'How can I improve cash flow?', actionId: 'improve_cashflow' },
          { label: 'Estimate next month profit', actionId: 'estimate_profit' }
        ];
      } else if (lower.includes('restock') || lower.includes('cash') || lower.includes('enough')) {
        replyText = "Yes, you have strong liquidity! Your current cash balance is RM 45,600, with expected client inflows of RM 17,200 this week. After deducting estimated payroll of RM 27,284 at month-end, you have approximately RM 35,516 safe buffer to restock inventory.";
        suggestedActions = [
          { label: 'Simulate RM 10k Inventory Purchase', actionId: 'simulate_purchase' }
        ];
      } else if (lower.includes('estimate') || lower.includes('next month') || lower.includes('profit')) {
        replyText = "Based on current recurring contracts (Tech Solutions & Corporate Catering) and seasonal F&B trends in Kuala Lumpur, next month's estimated revenue is RM 134,000 with projected expenses of RM 71,000, yielding an estimated Net Profit of RM 63,000 (+4.6%).";
      } else if (lower.includes('sst') || lower.includes('tax') || lower.includes('filing')) {
        replyText = "Your SST summary for Q2 2024 (Jan - Jun):\n• Taxable Sales (Goods 10%): RM 300,000 -> RM 30,000 Tax\n• Taxable Services (6%): RM 150,000 -> RM 9,000 Tax\n• Gross SST: RM 39,000\n• Less Input Tax Credit / Exemptions: -RM 17,400\n• Net SST Due to Royal Malaysian Customs: RM 21,600\nDue date: 31 July 2024 (15 days remaining).";
        suggestedActions = [
          { label: 'Start SST-02 Filing Now', actionId: 'review_sst_02' }
        ];
      } else if (lower.includes('reminder') || lower.includes('overdue') || lower.includes('draft')) {
        replyText = "I have drafted a polite payment reminder email for Apex Marketing (INV-2023-003, RM 3,200.00, overdue by 14 days) and Aiman's Cafe Events (INV-2023-089, RM 1,250.00). Would you like to preview and dispatch?";
        suggestedActions = [
          { label: 'Open Reminder Drafter', actionId: 'open_reminder_modal' }
        ];
      } else if (lower.includes('duplicate') || lower.includes('flagged')) {
        replyText = "I found 2 identical charges of RM 1,200.00 on Jun 8, 2023 for 'Specialty Beans Wholesale Raw Roast'. I recommend contacting Maybank or the supplier to void the second transaction (tx-6).";
      } else {
        replyText = `Understood! I've analyzed your financial ledger. For "${query}", everything is synchronized with your Malaysian SST rate (${invoices.length} active invoices tracked). What specific breakdown would you like to review?`;
        suggestedActions = [
          { label: 'Summarize my finances', actionId: 'summarize' },
          { label: 'Do I have enough cash to restock?', actionId: 'restock' }
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          timestamp: 'Just now',
          suggestedActions
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === 'draft_reminders' || actionId === 'open_reminder_modal') {
      const overdueInv = invoices.find((i) => i.status === 'overdue');
      if (overdueInv) {
        onOpenDraftReminder(overdueInv.id);
      } else {
        onOpenDraftReminder(invoices[0]?.id || 'inv-1');
      }
    } else if (actionId === 'review_sst_02') {
      onOpenSSTFiling();
    } else if (actionId === 'explain_sst') {
      handleSendMessage('Explain my SST calculation and exemptions');
    } else if (actionId === 'overdue_report') {
      onNavigateTab('invoices');
      handleSendMessage('Give me a detailed overdue invoice breakdown');
    } else if (actionId === 'review_duplicates') {
      onNavigateTab('transactions');
      handleSendMessage('Show me details of the flagged duplicate transactions');
    } else if (actionId === 'summarize') {
      handleSendMessage('Summarize my finances');
    } else if (actionId === 'restock') {
      handleSendMessage('Do I have enough cash to restock?');
    } else if (actionId === 'estimate_profit') {
      handleSendMessage('Estimate next month profit');
    } else {
      handleSendMessage(`Help me with ${actionId.replace(/_/g, ' ')}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      id="copilot-drawer"
      className={`fixed right-0 top-0 h-screen bg-slate-900/95 backdrop-blur-2xl shadow-2xl border-l border-slate-800 text-slate-100 flex flex-col z-50 transition-all duration-300 ${
        isExpanded ? 'w-[480px]' : 'w-[320px] md:w-[340px]'
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md copilot-active">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-slate-100">Fintel Copilot</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            </div>
            <p className="text-[11px] text-indigo-400 font-medium">AI Financial Assistant Active</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
            title={isExpanded ? 'Collapse width' : 'Expand width'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Close Copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto chat-scroll flex flex-col gap-4 bg-slate-950/60">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex flex-col gap-2 ${isAi ? 'items-start' : 'items-end'}`}
            >
              <div className={`flex gap-2.5 max-w-[92%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                {isAi && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex-shrink-0 flex items-center justify-center mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs md:text-[13px] leading-relaxed shadow-sm ${
                    isAi
                      ? 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-xs whitespace-pre-line'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-xs shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {/* Action Buttons for AI Suggestions */}
              {isAi && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-col gap-1.5 pl-9 w-full">
                  {msg.suggestedActions.map((action) => (
                    <button
                      key={action.actionId}
                      onClick={() => handleActionClick(action.actionId)}
                      className="text-left bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 text-slate-200 text-xs px-3 py-2 rounded-xl shadow-sm transition-all flex items-center justify-between group active:scale-[0.99]"
                    >
                      <span className="font-medium">{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 pl-2 text-xs text-slate-400">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            <span className="text-[11px] font-medium ml-1 text-slate-400">Fintel Copilot is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 pt-2 pb-1 border-t border-slate-800 bg-slate-900/90">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar text-[11px]">
          <button
            onClick={() => handleSendMessage('Summarize my finances')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/50 text-slate-300 hover:text-indigo-300 font-medium transition-colors"
          >
            📊 Summarize finances
          </button>
          <button
            onClick={() => handleSendMessage('Do I have enough cash to restock?')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/50 text-slate-300 hover:text-indigo-300 font-medium transition-colors"
          >
            💰 Cash to restock?
          </button>
          <button
            onClick={() => handleSendMessage('Estimate next month profit')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/50 text-slate-300 hover:text-indigo-300 font-medium transition-colors"
          >
            📈 Forecast profit
          </button>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/95">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            id="copilot-user-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Fintel Copilot..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-full py-2.5 pl-4 pr-11 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white flex items-center justify-center hover:brightness-110 transition-all shadow-sm active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-500 mt-1.5">
          AI Copilot assists with accounting & tax insights. Verify important tax filings.
        </p>
      </div>
    </aside>
  );
};
