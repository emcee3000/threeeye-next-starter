import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function signIn(e) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert(error.message);
      setStatus('idle');
    } else {
      setStatus('sent');
    }
  }

  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:16}}>
      <h1>Sign in</h1>
      {status === 'sent' ? (
        <p>Check your email for the magic link. Keep this tab open.</p>
      ) : (
        <form onSubmit={signIn}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{padding:8, width:'100%', maxWidth:360}}
          />
          <div style={{height:12}} />
          <button disabled={status==='sending'} type="submit">
            {status === 'sending' ? 'Sending…' : 'Send magic link'}
          </button>
        </form>
      )}
    </main>
  );
}
