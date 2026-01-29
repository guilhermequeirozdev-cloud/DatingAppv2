'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageShell from '../../../components/PageShell';
import Card from '../../../components/Card';
import PrimaryButton from '../../../components/PrimaryButton';
import { API_URL } from '../../../lib/api';

interface WatchDetail {
  id: string;
  brand: string;
  model: string;
  price: number;
  condition: string;
  description: string;
  images: string[];
  sellerId: string;
  seller?: { name: string };
}

interface DemoUser {
  id: string;
  role: string;
}

export default function WatchDetailPage({ params }: { params: { id: string } }) {
  const [watch, setWatch] = useState<WatchDetail | null>(null);
  const [buyerId, setBuyerId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/watches/${params.id}`)
      .then((res) => res.json())
      .then(setWatch)
      .catch(() => null);

    fetch(`${API_URL}/auth/demo`)
      .then((res) => res.json())
      .then((users: DemoUser[]) => {
        const buyer = users.find((user) => user.role === 'BUYER');
        if (buyer) setBuyerId(buyer.id);
      })
      .catch(() => null);
  }, [params.id]);

  const createOrder = async (redirectTo: 'checkout' | 'chat') => {
    if (!watch || !buyerId) return;
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyerId, sellerId: watch.sellerId, watchId: watch.id }),
    });
    const order = await res.json();
    router.push(`/${redirectTo}/${order.id}`);
  };

  if (!watch) {
    return (
      <PageShell>
        <Card>Carregando...</Card>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div
          className="rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${watch.images?.[0]})`, minHeight: 420 }}
        />
        <Card>
          <h1 className="text-3xl font-semibold">
            {watch.brand} {watch.model}
          </h1>
          <p className="mt-2 text-text-muted">{watch.condition}</p>
          <p className="mt-4 text-text-muted">{watch.description}</p>
          <p className="mt-6 text-2xl font-semibold text-gold">R$ {watch.price.toLocaleString('pt-BR')}</p>
          <div className="mt-6 flex flex-col gap-3">
            <PrimaryButton onClick={() => createOrder('checkout')}>Comprar agora</PrimaryButton>
            <button
              className="rounded-full border border-border-soft px-4 py-2 text-sm"
              onClick={() => createOrder('chat')}
            >
              Iniciar chat
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold-soft text-gold">✓</span>
              Autenticação garantida • Vendedor: {watch.seller?.name || 'Vendedor demo'}
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
