'use client';

import { useEffect, useState } from 'react';
import PageShell from '../../../components/PageShell';
import Card from '../../../components/Card';
import PrimaryButton from '../../../components/PrimaryButton';
import { API_URL } from '../../../lib/api';

interface OrderDetail {
  id: string;
  status: string;
  escrowStatus: string;
  trackingCode?: string;
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [reason, setReason] = useState('');
  const [trackingStatus, setTrackingStatus] = useState<string>('');

  const loadOrder = () => {
    fetch(`${API_URL}/orders/${params.id}`)
      .then((res) => res.json())
      .then(setOrder)
      .catch(() => null);
  };

  useEffect(() => {
    loadOrder();
  }, [params.id]);

  const confirmDelivery = async () => {
    const res = await fetch(`${API_URL}/orders/${params.id}/confirm-delivery`, { method: 'POST' });
    const data = await res.json();
    setOrder(data);
  };

  const openDispute = async () => {
    await fetch(`${API_URL}/orders/${params.id}/disputes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, comment: 'Demo dispute' }),
    });
    setReason('');
  };

  const track = async () => {
    if (!order?.trackingCode) return;
    const res = await fetch(`${API_URL}/shipping/track/${order.trackingCode}`);
    const data = await res.json();
    setTrackingStatus(data.status.join(' • '));
  };

  return (
    <PageShell>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h1 className="text-2xl font-semibold">Pedido #{order?.id}</h1>
          <p className="mt-2 text-text-muted">Status: {order?.status}</p>
          <p className="text-text-muted">Escrow: {order?.escrowStatus}</p>
          <p className="mt-4 text-sm text-text-muted">Tracking: {order?.trackingCode || 'Aguardando envio'}</p>
          {trackingStatus && <p className="mt-2 text-xs text-text-muted">{trackingStatus}</p>}
          <div className="mt-6 flex flex-col gap-3">
            <PrimaryButton onClick={confirmDelivery}>Confirmar recebimento</PrimaryButton>
            <button className="rounded-full border border-border-soft px-4 py-2 text-sm" onClick={track}>
              Atualizar tracking
            </button>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Abrir disputa</h2>
          <input
            className="mt-4 w-full rounded-full border border-border-soft bg-bg-card px-4 py-2"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Motivo da disputa"
          />
          <PrimaryButton className="mt-4" onClick={openDispute}>
            Enviar disputa
          </PrimaryButton>
        </Card>
      </div>
    </PageShell>
  );
}
