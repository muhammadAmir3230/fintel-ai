import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import App from './App';
import { Login } from './components/LoginScreen';

export const AuthGate: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] text-gray-500">
        Loading…
      </div>
    );
  }

  if (!session) return <Login />;

  return (
    <>
      <App />
      <button
        onClick={() => supabase.auth.signOut()}
        className="fixed bottom-4 left-4 z-50 text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow text-gray-600 hover:bg-gray-50"
      >
        Sign out
      </button>
    </>
  );
};