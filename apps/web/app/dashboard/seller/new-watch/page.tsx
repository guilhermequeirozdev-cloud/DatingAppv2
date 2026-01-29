'use client';

import { useEffect, useState } from 'react';
import PageShell from '../../../../components/PageShell';
import Card from '../../../../components/Card';
import PrimaryButton from '../../../../components/PrimaryButton';
import { API_URL } from '../../../../lib/api';

export default function NewWatchPage() {
  const [aiResult, setAiResult] = useState<{ score: number; verdict: string; notes: string } | null>(null);
  const [sellerId, setSellerId] = useState('');
  const [form, setForm] = useState({
    brand: '',
    model: '',
    price: 0,
    condition: '',
    description: '',
    images: [] as string[],
  });

  useEffect(() => {
    fetch(`${API_URL}/auth/demo`)
      .then((res) => res.json())
      .then((users) => {
        const seller = users.find((user: { role: string }) => user.role === 'SELLER');
        if (seller) setSellerId(seller.id);
      })
      .catch(() => null);
  }, []);

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    const res = await fetch(`${API_URL}/watches/upload`, {
      method: 'POST',
      body: data,
    });
    const response = await res.json();
    setForm((prev) => ({ ...prev, images: [...prev.images, response.url] }));
  };

  const submit = async () => {
    if (!sellerId) return;
    const res = await fetch(`${API_URL}/watches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        sellerId,
      }),
    });
    const data = await res.json();
    setAiResult(data.ai);
  };

  return (
    <PageShell>
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Card>
          <h1 className="text-2xl font-semibold">Cadastrar relógio</h1>
          <div className="mt-6 grid gap-3">
            {['brand', 'model', 'condition', 'description'].map((field) => (
              <input
                key={field}
                className="rounded-full border border-border-soft bg-bg-card px-4 py-2"
                placeholder={field}
                value={(form as any)[field]}
                onChange={(event) => setForm({ ...form, [field]: event.target.value })}
              />
            ))}
            <input
              className="rounded-full border border-border-soft bg-bg-card px-4 py-2"
              placeholder="price"
              type="number"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
            />
            <input
              className="rounded-full border border-border-soft bg-bg-card px-4 py-2"
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) uploadImage(file);
              }}
            />
            {form.images.length > 0 && (
              <p className="text-xs text-text-muted">{form.images.length} imagem(ns) anexada(s)</p>
            )}
          </div>
          <PrimaryButton className="mt-6" onClick={submit}>
            Enviar para IA (mock)
          </PrimaryButton>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Resultado da IA</h2>
          {aiResult ? (
            <div className="mt-4">
              <p className="text-3xl text-gold">{aiResult.score}</p>
              <p className="text-text-muted">{aiResult.verdict}</p>
              <p className="text-sm text-text-muted">{aiResult.notes}</p>
              <div className="mt-4 flex gap-3">
                <PrimaryButton>Aprovar</PrimaryButton>
                <button className="rounded-full border border-border-soft px-4 py-2 text-sm">Reprovar</button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-text-muted">Envie as imagens para obter o score.</p>
          )}
        </Card>
      </div>
    </PageShell>
  );
}
