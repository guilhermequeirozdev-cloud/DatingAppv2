'use client';

import { useState } from 'react';
import PageShell from '../../components/PageShell';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import { API_URL } from '../../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMessage(data.token ? 'Login realizado (demo).' : data.error);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <Card>
          <h1 className="text-2xl font-semibold">Login</h1>
          <input
            className="mt-4 w-full rounded-full border border-border-soft bg-bg-card px-4 py-2"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="mt-3 w-full rounded-full border border-border-soft bg-bg-card px-4 py-2"
            placeholder="senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <PrimaryButton className="mt-6 w-full" onClick={login}>
            Entrar
          </PrimaryButton>
          {message && <p className="mt-4 text-sm text-text-muted">{message}</p>}
        </Card>
      </div>
    </PageShell>
  );
}
