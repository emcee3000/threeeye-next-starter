import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { createSupabaseClient } from '../lib/supabaseClient';

export default function Home() {
  const [message, setMessage] = useState('');
  useEffect(() => setMessage('Deployed on Vercel ✅'), []);

  // Optional: prove Supabase client can be created without crashing
  return (
    <main>
      <h1>Three Eye Analytics</h1>
      <p>This is a minimal Next.js starter using the <code>pages/</code> router.</p>
      <p>{message}</p>
      <p><Link href="/auth">Sign in</Link></p>

      <div className="box">
        <b>Env check:</b>
        <div>
          Public Supabase URL present?{' '}
          <code>{process.env.NEXT_PUBLIC_SUPABASE_URL ? 'yes' : 'no'}</code>
        </div>
      </div>
    </main>
  );
}
