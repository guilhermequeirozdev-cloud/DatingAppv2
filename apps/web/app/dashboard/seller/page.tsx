'use client';

import { useEffect, useState } from 'react';
import PageShell from '../../../components/PageShell';
import Card from '../../../components/Card';
import PrimaryButton from '../../../components/PrimaryButton';
import { API_URL } from '../../../lib/api';
import Link from 'next/link';

interface OrderItem {
  id: string;
  status: string;
  trackingCode?: string;
  watch?: { brand: string; model: string };
}

interface WatchItem {
  id: string;
  brand: string;
  model: string;
  status: string;
  aiScore?: number;
}

export default function SellerDashboard() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [watches, setWatches] = useState<WatchItem[]>([]);
  const [sellerId, setSellerId] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/auth/demo`)
      .then((res) => res.json())
      .then((users) => {
        const seller = users.find((user: { role: string }) => user.role === 'SELLER');
        if (seller) setSellerId(seller.id);
      })
      .catch(() => null);
  }, []);

  useEffect(() => {
    if (!sellerId) return;
    fetch(`${API_URL}/orders?sellerId=${sellerId}`)
      .then((res) => res.json())
      .then(setOrders)
      .catch(() => null);

    fetch(`${API_URL}/watches?sellerId=${sellerId}&status=PENDING`)
      .then((res) => res.json())
      .then(setWatches)
      .catch(() => null);
  }, [sellerId]);

  const generateShipping = async (orderId: string) => {
    const res = await fetch(`${API_URL}/shipping/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, trackingCode: data.trackingCode } : order)));
  };

  return (
    <PageShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard do Seller</h1>
        <Link href="/dashboard/seller/new-watch" className="text-sm text-gold">
          Cadastrar relógio
        </Link>
      </div>
      <div className="mt-6 grid gap-4">
        <Card>
          <h2 className="text-lg font-semibold">Relógios em análise</h2>
          <div className="mt-4 grid gap-3">
            {watches.map((watch) => (
              <div key={watch.id} className="flex items-center justify-between rounded-xl border border-border-soft bg-bg-card/60 px-4 py-3">
                <div>
                  <p className="font-semibold">
                    {watch.brand} {watch.model}
                  </p>
                  <p className="text-xs text-text-muted">Score IA: {watch.aiScore ?? '--'}</p>
                </div>
                <span className="text-xs text-gold">{watch.status}</span>
              </div>
            ))}
            {watches.length === 0 && <p className="text-sm text-text-muted">Nenhum relógio pendente.</p>}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Pedidos recebidos</h2>
          <div className="mt-4 grid gap-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Pedido {order.id}</p>
                  <p className="font-semibold">
                    {order.watch?.brand} {order.watch?.model}
                  </p>
                  <p className="text-xs text-text-muted">Tracking: {order.trackingCode || 'Não gerado'}</p>
                </div>
                <PrimaryButton onClick={() => generateShipping(order.id)}>Gerar envio</PrimaryButton>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
