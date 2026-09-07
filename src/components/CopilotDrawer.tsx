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
import { CopilotMessage, TabType, Invoice, Transaction, BusinessProfile } from '../types';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: TabType;
  invoices: Invoice[];
  onNavigateTab: (tab: TabType) => void;
  onOpenDraftReminder: (invoiceId: string) => void;
  onOpenSSTFiling: () => void;
  transactions: Transaction[];
  businessProfile: BusinessProfile;
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  invoices,
  onNavigateTab,
  onOpenDraftReminder,
  onOpenSSTFiling,
  transactions,
  businessProfile
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hi ${businessProfile.ownerName || 'there'}! I'm your AI finance copilot. How can I help you grow your business today?`,
      timestamp: 'Just now',
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === 'm-1'
          ? { ...m, text: `Hi ${businessProfile.ownerName || 'there'}! I'm your AI finance copilot. How can I help you grow your business today?` }
          : m
      )
    );
  }, [businessProfile.ownerName]);

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
    const overdue = invoices.filter((i) => i.status === 'overdue');
    if (currentTab === 'invoices' && overdue.length > 0) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === 'm-inv-init')) return prev;
        const total = overdue.reduce((s, i) => s + (i.amount || 0), 0);
        return [...prev, {
          id: 'm-inv-init',
          sender: 'ai',
          text: `You have ${overdue.length} overdue invoice(s) totaling RM ${total.toLocaleString('en-MY', { maximumFractionDigits: 0 })}. Want me to draft polite payment reminders?`,
          timestamp: 'Just now',
          suggestedActions: [
            { label: 'Draft payment reminders', actionId: 'draft_reminders' },
            { label: 'View overdue report', actionId: 'overdue_report' },
          ],
        }];
      });
    }
  }, [currentTab, invoices]);

const handleSendMessage = async (textToSend?: string) => {
  const query = textToSend || inputText.trim();
  if (!query) return;

  const userMsg: CopilotMessage = {
    id: `u-${Date.now()}`,
    sender: 'user',
    text: query,
    timestamp: 'Just now',
  };
  setMessages((prev) => [...prev, userMsg]);
  if (!textToSend) setInputText('');
  setIsTyping(true);

  const unpaid = invoices.filter((i) => i.status !== 'paid');
  const overdue = invoices.filter((i) => i.status === 'overdue');
  const paid = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + (i.amount || 0), 0);
  const inflow = transactions.filter((t) => t.type === 'inflow').reduce((s, t) => s + (t.amount || 0), 0);
  const outflow = transactions.filter((t) => t.type === 'outflow').reduce((s, t) => s + (t.amount || 0), 0);
  const revenue = paid + inflow;
  const expenses = outflow;
  const finance = {
    business: businessProfile.name,
    owner: businessProfile.ownerName,
    currency: 'RM',
    sstRate: (businessProfile.defaultTaxRate ?? 6) + '% (services)',
    totalInvoices: invoices.length,
    outstandingReceivables: unpaid.reduce((s, i) => s + (i.amount || 0), 0),
    overdueCount: overdue.length,
    overdueAmount: overdue.reduce((s, i) => s + (i.amount || 0), 0),
    revenue,
    expenses,
    netProfit: revenue - expenses,
    cashBalance: revenue - expenses,
  };

  try {
    const res = await fetch('/api/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        finance,
        history: messages.slice(-6).map((m) => ({
          role: m.sender === 'ai' ? 'model' : 'user',
          text: m.text,
        })),
      }),
    });
    const data = await res.json();
    const replyText = data.reply || data.error || "Sorry, I couldn't get a response. Please try again.";
    setMessages((prev) => [
      ...prev,
      { id: `ai-${Date.now()}`, sender: 'ai', text: replyText, timestamp: 'Just now' },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "I can't reach the AI service right now. If you're testing locally with npm run dev, the /api endpoint only works on the deployed Vercel site.",
        timestamp: 'Just now',
      },
    ]);
  } finally {
    setIsTyping(false);
  }
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
      className={`fixed right-0 top-0 h-screen bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-gray-200 text-slate-800 flex flex-col z-50 transition-all duration-300 ${
        isExpanded ? 'w-[480px]' : 'w-[320px] md:w-[340px]'
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-white/90 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-600 text-slate-900 flex items-center justify-center shadow-md copilot-active">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-slate-800">Fintel Copilot</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">AI Financial Assistant Active</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-600 hover:text-emerald-400 hover:bg-gray-50 rounded-lg transition-colors"
            title={isExpanded ? 'Collapse width' : 'Expand width'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-rose-400 hover:bg-gray-50 rounded-lg transition-colors"
            title="Close Copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto chat-scroll flex flex-col gap-4 bg-white/60">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex flex-col gap-2 ${isAi ? 'items-start' : 'items-end'}`}
            >
              <div className={`flex gap-2.5 max-w-[92%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                {isAi && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex-shrink-0 flex items-center justify-center mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs md:text-[13px] leading-relaxed shadow-sm ${
                    isAi
                      ? 'bg-white/90 text-slate-600 border border-gray-200 rounded-tl-xs whitespace-pre-line'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-slate-900 rounded-tr-xs shadow-md'
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
                      className="text-left bg-white/90 border border-gray-200 hover:border-emerald-500/50 hover:bg-gray-50/80 text-slate-600 text-xs px-3 py-2 rounded-xl shadow-sm transition-all flex items-center justify-between group active:scale-[0.99]"
                    >
                      <span className="font-medium">{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 pl-2 text-xs text-slate-600">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            <span className="text-[11px] font-medium ml-1 text-slate-600">Fintel Copilot is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 pt-2 pb-1 border-t border-gray-200 bg-white/90">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar text-[11px]">
          <button
            onClick={() => handleSendMessage('Summarize my finances')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-gray-50/80 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-gray-200/50 text-slate-600 hover:text-emerald-300 font-medium transition-colors"
          >
            📊 Summarize finances
          </button>
          <button
            onClick={() => handleSendMessage('Do I have enough cash to restock?')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-gray-50/80 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-gray-200/50 text-slate-600 hover:text-emerald-300 font-medium transition-colors"
          >
            💰 Cash to restock?
          </button>
          <button
            onClick={() => handleSendMessage('Estimate next month profit')}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-gray-50/80 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-gray-200/50 text-slate-600 hover:text-emerald-300 font-medium transition-colors"
          >
            📈 Forecast profit
          </button>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-200 bg-white/95">
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
            className="w-full bg-white/80 border border-gray-200 rounded-full py-2.5 pl-4 pr-11 text-xs md:text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-600 disabled:from-gray-50 disabled:to-gray-100 disabled:text-slate-600 text-slate-900 flex items-center justify-center hover:brightness-110 transition-all shadow-sm active:scale-95"
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
