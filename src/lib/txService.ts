// TARGET: src/lib/txService.ts
// Loads/saves each user's transactions (expenses/income) from Supabase.

import { supabase } from './supabase';
import type { Transaction } from '../types';

async function getBusinessId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('businesses').select('id').eq('owner_id', user.id).limit(1).maybeSingle();
  return data?.id ?? null;
}

function rowToTx(r: any): Transaction {
  return {
    id: r.id,
    date: r.tx_date ?? '',
    description: r.description ?? '',
    category: r.category ?? '',
    account: r.account ?? '',
    status: (r.status ?? 'completed') as Transaction['status'],
    amount: Number(r.amount ?? 0),
    type: (r.type ?? 'outflow') as Transaction['type'],
    iconType: (r.icon_type ?? 'payment') as Transaction['iconType'],
    flagReason: r.flag_reason ?? undefined,
  };
}

export async function getTransactions(): Promise<Transaction[]> {
  const bid = await getBusinessId();
  if (!bid) return [];
  const { data, error } = await supabase
    .from('transactions').select('*').eq('business_id', bid)
    .order('created_at', { ascending: false });
  if (error) { console.error('getTransactions error', error); return []; }
  return (data ?? []).map(rowToTx);
}

export async function createTransaction(tx: Omit<Transaction, 'id'>): Promise<Transaction | null> {
  const bid = await getBusinessId();
  if (!bid) return null;
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      business_id: bid,
      tx_date: tx.date,
      description: tx.description,
      category: tx.category,
      account: tx.account,
      status: tx.status,
      amount: tx.amount,
      type: tx.type,
      icon_type: tx.iconType,
      flag_reason: tx.flagReason ?? null,
    })
    .select().single();
  if (error) { console.error('createTransaction error', error); return null; }
  return rowToTx(data);
}

export async function resolveFlagged(id: string): Promise<void> {
  const { error } = await supabase
    .from('transactions').update({ status: 'completed', flag_reason: null }).eq('id', id);
  if (error) console.error('resolveFlagged error', error);
}