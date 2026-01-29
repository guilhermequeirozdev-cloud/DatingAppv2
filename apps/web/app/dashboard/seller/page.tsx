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

export default function SellerDashboard() {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/orders`)
      .then((res) => res.json())
      .then(setOrders)
      .catch(() => null);
  }, []);

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
        {orders.map((order) => (
          <Card key={order.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Pedido {order.id}</p>
                <p className="font-semibold">
                  {order.watch?.brand} {order.watch?.model}
                </p>
                <p className="text-xs text-text-muted">Tracking: {order.trackingCode || 'Não gerado'}</p>
              </div>
              <PrimaryButton onClick={() => generateShipping(order.id)}>Gerar envio</PrimaryButton>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
