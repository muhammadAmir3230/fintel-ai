// TARGET: src/lib/invoiceService.ts
// Loads/saves each user's invoices from Supabase (tied to their business).

import { supabase } from './supabase';
import type { Invoice } from '../types';

async function getBusinessId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .limit(1)
    .maybeSingle();
  return data?.id ?? null;
}

function rowToInvoice(r: any): Invoice {
  return {
    id: r.id,
    invoiceNumber: r.number ?? '',
    customerName: r.customer_name ?? '',
    customerInitials: r.customer_initials ?? '',
    customerEmail: r.customer_email ?? '',
    date: r.inv_date ?? '',
    dueDate: r.due_txt ?? '',
    amount: Number(r.amount ?? 0),
    status: (r.status ?? 'pending') as Invoice['status'],
    type: (r.type ?? 'standard') as Invoice['type'],
    items: r.items ?? [],
    notes: r.notes ?? '',
  };
}

export async function getInvoices(): Promise<Invoice[]> {
  const bid = await getBusinessId();
  if (!bid) return [];
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('business_id', bid)
    .order('created_at', { ascending: false });
  if (error) { console.error('getInvoices error', error); return []; }
  return (data ?? []).map(rowToInvoice);
}

export async function createInvoice(inv: Invoice): Promise<Invoice | null> {
  const bid = await getBusinessId();
  if (!bid) return null;
  const { data, error } = await supabase
    .from('invoices')
    .insert({
      business_id: bid,
      number: inv.invoiceNumber,
      customer_name: inv.customerName,
      customer_initials: inv.customerInitials,
      customer_email: inv.customerEmail,
      inv_date: inv.date,
      due_txt: inv.dueDate,
      amount: inv.amount,
      status: inv.status,
      type: inv.type ?? 'standard',
      items: inv.items ?? [],
      notes: inv.notes ?? '',
    })
    .select()
    .single();
  if (error) { console.error('createInvoice error', error); return null; }
  return rowToInvoice(data);
}

export async function updateInvoiceStatus(id: string, status: Invoice['status']): Promise<void> {
  const { error } = await supabase.from('invoices').update({ status }).eq('id', id);
  if (error) console.error('updateInvoiceStatus error', error);
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await supabase.from('invoices').delete().eq('id', id);
  if (error) console.error('deleteInvoice error', error);
}