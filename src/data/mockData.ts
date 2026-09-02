import { Invoice, Transaction, SSTCategory, SSTFiling, BusinessProfile, ChecklistItem } from '../types';

export const initialBusinessProfile: BusinessProfile = {
  name: "Aiman's Cafe",
  ssmNo: "202301045678 (1523412-V)",
  industry: "Food & Beverage",
  financialYearEnd: "December (31 Dec)",
  sstRegistered: true,
  defaultTaxRate: 6,
  ownerName: "Aiman",
  currency: "RM",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhlJNTqCRRgvValTSyGPU20TVKz1ymkhWkKUdx8EzQu84NVr2Q-MpWJObGMWUOjmt6Z_WTOQysmqMtdzxuf12zWkb2K_7FjL5wmnN-foAxvupSfTJtX6vKNUKrnVU13OheRnYNO4Jo61azCol91dy3wpJSnKYLkLipNlBpGxICRQKAqPmuY1fpN0snphfdY4SPKdLC27cPnW-ahCtkxVkmnLTCY6pbfswvbN2kReEZhHA6r5VTpbGw",
  logoUrl: "https://ehtqpdybwjymwxrzrlwi.supabase.co/storage/v1/object/public/assets/fintel_logo.png",
};

export const initialChecklist: ChecklistItem[] = [
  { id: '1', label: 'Create account profile', completed: true },
  { id: '2', label: 'Add first customer', completed: true },
  { id: '3', label: 'Connect bank account', completed: true },
  { id: '4', label: 'Customize invoice template', completed: false },
  { id: '5', label: 'Send first invoice', completed: false },
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2023-089',
    customerName: "Aiman's Cafe Events",
    customerInitials: 'AC',
    customerEmail: 'events@aimancafe.my',
    date: 'Oct 10, 2023',
    dueDate: 'Oct 24, 2023',
    amount: 1250.00,
    status: 'overdue',
    type: 'standard',
    items: [
      { id: 'i1', description: 'Artisan Coffee Catering Package (50 pax)', quantity: 1, unitPrice: 1179.25, taxRate: 6, total: 1250.00 }
    ],
    notes: 'Payment overdue by 16 days. Reminders scheduled.'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2023-090',
    customerName: 'Tech Solution Ltd',
    customerInitials: 'TS',
    customerEmail: 'finance@techsolutions.com.my',
    date: 'Oct 15, 2023',
    dueDate: 'Oct 29, 2023',
    amount: 4500.00,
    status: 'paid',
    type: 'standard',
    items: [
      { id: 'i2', description: 'Monthly Corporate Pantry Subscription', quantity: 3, unitPrice: 1415.09, taxRate: 6, total: 4500.00 }
    ],
    notes: 'Paid via Maybank Instant Transfer.'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2023-091',
    customerName: 'Maju Trading Sdn Bhd',
    customerInitials: 'M',
    customerEmail: 'procurement@majutrading.com',
    date: 'Oct 20, 2023',
    dueDate: 'Nov 03, 2023',
    amount: 8900.00,
    status: 'pending',
    type: 'standard',
    items: [
      { id: 'i3', description: 'Specialty Roasted Beans Wholesale (100kg)', quantity: 1, unitPrice: 8396.23, taxRate: 6, total: 8900.00 }
    ],
    notes: 'Due in 5 days. Sent via email.'
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2023-092',
    customerName: 'Bintang Design Studio',
    customerInitials: 'B',
    customerEmail: 'hello@bintangdesign.co',
    date: 'Oct 24, 2023',
    dueDate: 'Nov 07, 2023',
    amount: 2100.00,
    status: 'draft',
    type: 'estimate',
    items: [
      { id: 'i4', description: 'Custom Cold Brew Bar Setup & Beverage Pack', quantity: 1, unitPrice: 1981.13, taxRate: 6, total: 2100.00 }
    ],
    notes: 'Draft estimate awaiting client approval.'
  },
  {
    id: 'inv-5',
    invoiceNumber: 'INV-2023-003',
    customerName: 'Apex Marketing',
    customerInitials: 'AM',
    customerEmail: 'billing@apexmarketing.my',
    date: 'Sep 28, 2023',
    dueDate: 'Oct 12, 2023',
    amount: 3200.00,
    status: 'overdue',
    type: 'standard',
    items: [
      { id: 'i5', description: 'VIP Barista Lounge Service - Product Launch', quantity: 1, unitPrice: 3018.87, taxRate: 6, total: 3200.00 }
    ],
    notes: 'Overdue by 14 days. AI Copilot drafted reminder.'
  },
  {
    id: 'inv-6',
    invoiceNumber: 'INV-2023-004',
    customerName: 'Nexus Design Studio',
    customerInitials: 'ND',
    customerEmail: 'admin@nexusstudio.io',
    date: 'Oct 18, 2023',
    dueDate: 'Nov 01, 2023',
    amount: 950.00,
    status: 'pending',
    type: 'recurring',
    items: [
      { id: 'i6', description: 'Weekly Pastry & Coffee Bundle (Week 42)', quantity: 1, unitPrice: 896.23, taxRate: 6, total: 950.00 }
    ],
    notes: 'Monthly recurring schedule.'
  },
  {
    id: 'inv-7',
    invoiceNumber: 'INV-2023-005',
    customerName: 'Sunrise Bakery',
    customerInitials: 'SB',
    customerEmail: 'accounts@sunrisebakery.com.my',
    date: 'Oct 20, 2023',
    dueDate: 'Oct 25, 2023',
    amount: 420.00,
    status: 'paid',
    type: 'standard',
    items: [
      { id: 'i7', description: 'Cross-Promotion Batch Nitro Cold Brew Cans', quantity: 70, unitPrice: 5.66, taxRate: 6, total: 420.00 }
    ],
    notes: 'Paid via DuitNow QR.'
  },
  {
    id: 'inv-8',
    invoiceNumber: 'INV-2023-001',
    customerName: 'Tech Solutions Ltd',
    customerInitials: 'TS',
    customerEmail: 'finance@techsolutions.com.my',
    date: 'Oct 01, 2023',
    dueDate: 'Oct 15, 2023',
    amount: 2500.00,
    status: 'paid',
    type: 'standard',
    items: [
      { id: 'i8', description: 'Quarterly Espresso Machine Maintenance & Refills', quantity: 1, unitPrice: 2358.49, taxRate: 6, total: 2500.00 }
    ],
    notes: 'Paid.'
  },
  {
    id: 'inv-9',
    invoiceNumber: 'INV-2023-002',
    customerName: 'Global Logistics Inc',
    customerInitials: 'GL',
    customerEmail: 'ops@globallogistics.com.my',
    date: 'Oct 15, 2023',
    dueDate: 'Oct 30, 2023',
    amount: 1850.00,
    status: 'pending',
    type: 'standard',
    items: [
      { id: 'i9', description: 'Staff Breakfast & Beverage Catering', quantity: 1, unitPrice: 1745.28, taxRate: 6, total: 1850.00 }
    ],
    notes: 'Awaiting clearance.'
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    date: 'Jun 15, 2023',
    description: 'GrabPay Business Travel',
    category: 'Travel',
    account: 'Maybank - 4321',
    status: 'completed',
    amount: 15.00,
    type: 'outflow',
    iconType: 'car'
  },
  {
    id: 'tx-2',
    date: 'Jun 14, 2023',
    description: 'Maxis Communications Fibre & Mobile',
    category: 'Utilities',
    account: 'Maybank - 4321',
    status: 'completed',
    amount: 150.00,
    type: 'outflow',
    iconType: 'wifi'
  },
  {
    id: 'tx-3',
    date: 'Jun 12, 2023',
    description: 'Tenaga Nasional Berhad Electricity',
    category: 'Utilities',
    account: 'Maybank - 4321',
    status: 'pending',
    amount: 420.00,
    type: 'outflow',
    iconType: 'bolt'
  },
  {
    id: 'tx-4',
    date: 'Jun 10, 2023',
    description: 'Client Payment #882 (Tech Solutions Ltd)',
    category: 'Sales',
    account: 'Maybank - 4321',
    status: 'completed',
    amount: 3500.00,
    type: 'inflow',
    iconType: 'payment'
  },
  {
    id: 'tx-5',
    date: 'Jun 08, 2023',
    description: 'Specialty Beans Wholesale Raw Roast',
    category: 'Inventory',
    account: 'Maybank - 4321',
    status: 'flagged',
    amount: 1200.00,
    type: 'outflow',
    iconType: 'coffee',
    flagReason: 'Potential duplicate charge detected with tx-6 (Same amount, same supplier on Jun 8).'
  },
  {
    id: 'tx-6',
    date: 'Jun 08, 2023',
    description: 'Specialty Beans Wholesale Raw Roast (Duplicate)',
    category: 'Inventory',
    account: 'Maybank - 4321',
    status: 'flagged',
    amount: 1200.00,
    type: 'outflow',
    iconType: 'coffee',
    flagReason: 'Duplicate merchant deduction flagged by Fintel Copilot.'
  },
  {
    id: 'tx-7',
    date: 'Jun 05, 2023',
    description: 'Adobe Creative Suite Subscription',
    category: 'Software',
    account: 'Maybank - 4321',
    status: 'completed',
    amount: 239.00,
    type: 'outflow',
    iconType: 'tools'
  },
  {
    id: 'tx-8',
    date: 'Jun 01, 2023',
    description: 'Catering Deposit #889 (Corporate Gala)',
    category: 'Sales',
    account: 'Maybank - 4321',
    status: 'completed',
    amount: 8950.00,
    type: 'inflow',
    iconType: 'payment'
  }
];

export const sstCategories: SSTCategory[] = [
  {
    id: 'sst-1',
    name: 'Sales (Goods)',
    categoryType: 'goods',
    taxableAmount: 300000.00,
    taxRate: 10,
    taxAmount: 30000.00
  },
  {
    id: 'sst-2',
    name: 'Services (Catering & Consultations)',
    categoryType: 'services',
    taxableAmount: 150000.00,
    taxRate: 6,
    taxAmount: 9000.00
  }
];

export const sstFilingsHistory: SSTFiling[] = [
  {
    id: 'filing-1',
    period: 'Q1 2024 Filing (Jan - Mar 2024)',
    submissionDate: 'Apr 12, 2024',
    totalPaid: 18250.00,
    status: 'paid'
  },
  {
    id: 'filing-2',
    period: 'Q4 2023 Filing (Oct - Dec 2023)',
    submissionDate: 'Jan 10, 2024',
    totalPaid: 22100.00,
    status: 'paid'
  },
  {
    id: 'filing-3',
    period: 'Q3 2023 Filing (Jul - Sep 2023)',
    submissionDate: 'Oct 14, 2023',
    totalPaid: 19400.00,
    status: 'paid'
  }
];

export const monthlyChartData = [
  { month: 'Jan', income: 110, expenses: 65 },
  { month: 'Feb', income: 115, expenses: 60 },
  { month: 'Mar', income: 120, expenses: 68 },
  { month: 'Apr', income: 118, expenses: 62 },
  { month: 'May', income: 125, expenses: 70 },
  { month: 'Jun', income: 128, expenses: 68 },
];

export const expenseBreakdownData = [
  { name: 'Rent', value: 25, amount: 17052, color: '#006c49' },
  { name: 'Salaries', value: 40, amount: 27284, color: '#10b981' },
  { name: 'Inventory', value: 20, amount: 13642, color: '#4edea3' },
  { name: 'Marketing', value: 10, amount: 6821, color: '#6bd8cb' },
  { name: 'Utilities', value: 5, amount: 3411, color: '#c3ecd7' },
];
