export type TabType = 
  | 'dashboard'
  | 'transactions'
  | 'invoices'
  | 'expenses'
  | 'bank'
  | 'customers'
  | 'suppliers'
  | 'reports'
  | 'tax'
  | 'settings'
  | 'onboarding';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // e.g. 6 or 10 or 0
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerInitials: string;
  customerEmail?: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  type?: 'standard' | 'recurring' | 'estimate';
  items?: InvoiceItem[];
  notes?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  status: 'completed' | 'pending' | 'flagged';
  amount: number;
  type: 'inflow' | 'outflow';
  iconType: 'car' | 'wifi' | 'bolt' | 'payment' | 'shopping' | 'coffee' | 'dining' | 'tools';
  flagReason?: string;
}

export interface SSTCategory {
  id: string;
  name: string;
  categoryType: 'goods' | 'services';
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
}

export interface SSTFiling {
  id: string;
  period: string;
  submissionDate: string;
  totalPaid: number;
  status: 'paid' | 'draft' | 'pending';
}

export interface CopilotMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionId: string; icon?: string }[];
  draftCard?: {
    type: 'reminder' | 'sst-summary' | 'duplicate-check' | 'cash-forecast';
    title: string;
    description: string;
    details?: Record<string, string | number>;
    primaryActionLabel?: string;
    secondaryActionLabel?: string;
    actionPayload?: any;
  };
}

export interface BusinessProfile {
  name: string;
  ssmNo: string;
  industry: string;
  financialYearEnd: string;
  sstRegistered: boolean;
  defaultTaxRate: number;
  ownerName: string;
  currency: string;
  avatarUrl: string;
  logoUrl: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}
