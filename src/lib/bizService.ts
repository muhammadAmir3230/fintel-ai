import { supabase } from './supabase';
import type { BusinessProfile } from '../types';

const LOGO_URL =
  'https://ehtqpdybwjymwxrzrlwi.supabase.co/storage/v1/object/public/assets/fintel_logo.png';

function rowToProfile(row: any): BusinessProfile {
  return {
    name: row.name ?? 'My Business',
    ssmNo: row.ssm_no ?? '',
    industry: row.industry ?? '',
    financialYearEnd: row.financial_year_end ?? '',
    sstRegistered: row.sst_registered ?? false,
    defaultTaxRate: Number(row.tax_rate ?? 6),
    ownerName: row.owner_name ?? 'Owner',
    currency: row.currency ?? 'RM',
    avatarUrl: row.avatar_url || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(row.owner_name || 'User') + '&background=10B981&color=fff'),
    logoUrl: LOGO_URL,
  };
}

export async function getOrCreateBusiness(): Promise<BusinessProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: existing } = await supabase
    .from('businesses').select('*').eq('owner_id', user.id).limit(1).maybeSingle();
  if (existing) return rowToProfile(existing);

  const prefix = user.email ? user.email.split('@')[0] : 'My';
  const { data: created, error } = await supabase
    .from('businesses')
    .insert({ owner_id: user.id, name: prefix + "'s Business", owner_name: prefix, currency: 'RM', tax_rate: 6, sst_registered: false })
    .select().single();
  if (error) { console.error('create business error', error); return null; }
  return rowToProfile(created);
}

export async function saveBusiness(profile: BusinessProfile): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const payload = {
    owner_id: user.id, name: profile.name, owner_name: profile.ownerName, ssm_no: profile.ssmNo,
    industry: profile.industry, financial_year_end: profile.financialYearEnd,
    sst_registered: profile.sstRegistered, tax_rate: profile.defaultTaxRate, currency: profile.currency, avatar_url: profile.avatarUrl,
  };
  const { data: existing } = await supabase
    .from('businesses').select('id').eq('owner_id', user.id).limit(1).maybeSingle();
  if (existing) {
    await supabase.from('businesses').update(payload).eq('id', existing.id);
  } else {
    await supabase.from('businesses').insert(payload);
  }

}

export async function uploadAvatar(file: File): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const path = `avatars/${user.id}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('assets').upload(path, file, { upsert: true });
  if (error) { console.error('uploadAvatar error', error); return null; }
  const { data } = supabase.storage.from('assets').getPublicUrl(path);
  return data.publicUrl;
}