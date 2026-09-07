// TARGET: src/AuthGate.tsx  (REPLACE the whole file)
// Detects the password-recovery link and shows the reset screen.

import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import App from './App';
import { Login } from './components/LoginScreen';
import { ResetPassword } from './components/ResetPassword';

export const AuthGate: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === 'PASSWORD_RECOVERY') setRecovering(true);
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

  if (recovering) return <ResetPassword onDone={() => setRecovering(false)} />;
  if (!session) return <Login />;
  return <App />;
};