'use client';

import { useState } from 'react';
import PageShell from '../../components/PageShell';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import { API_URL } from '../../lib/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const register = async () => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, role: 'BUYER' }),
    });
    const data = await res.json();
    setMessage(data.token ? 'Cadastro realizado (demo).' : 'Erro ao cadastrar');
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <Card>
          <h1 className="text-2xl font-semibold">Criar conta</h1>
          {['name', 'email', 'password'].map((field) => (
            <input
              key={field}
              className="mt-3 w-full rounded-full border border-border-soft bg-bg-card px-4 py-2"
              placeholder={field}
              type={field === 'password' ? 'password' : 'text'}
              value={(form as any)[field]}
              onChange={(event) => setForm({ ...form, [field]: event.target.value })}
            />
          ))}
          <PrimaryButton className="mt-6 w-full" onClick={register}>
            Cadastrar
          </PrimaryButton>
          {message && <p className="mt-4 text-sm text-text-muted">{message}</p>}
        </Card>
      </div>
    </PageShell>
  );
}
