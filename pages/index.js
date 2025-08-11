import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [message, setMessage] = useState('');
  const [session, setSession] = useState(null);

  useEffect(() => {
    setMessage('Deployed on Vercel ✅');

    // get current session
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));

    // subscribe to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <main>
      <Header session={session} />
      <h1>Three Eye Analytics</h1>
      <p>This is a minimal Next.js starter using the <code>pages/</code> router.</p>
      <p>{message}</p>
      <p><Link href="/auth">Sign in</Link></p>

      <div className="box">
        <b>Env check:</b>
        <div>Public Supabase URL present? <code>{process.env.NEXT_PUBLIC_SUPABASE_URL ? 'yes' : 'no'}</code></div>
      </div>
    </main>
  );
}

function Header({ session }) {
  if (!session) return null;
  return (
    <div style={{display:'flex', gap:12, alignItems:'center', margin:'8px 0 16px'}}>
      <div>Signed in as <code>{session.user.email}</code></div>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </div>
  );
}
