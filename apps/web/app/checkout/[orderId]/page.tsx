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
  watch?: { brand: string; model: string; price: number; images?: string[] | string };
}

export default function CheckoutPage({ params }: { params: { orderId: string } }) {
  const [pix, setPix] = useState<{ qrCode: string; qrCodeImageUrl: string; status: string } | null>(null);
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/payments/pix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: params.orderId }),
    })
      .then((res) => res.json())
      .then(setPix)
      .catch(() => null);

    fetch(`${API_URL}/orders/${params.orderId}`)
      .then((res) => res.json())
      .then(setOrder)
      .catch(() => null);
  }, [params.orderId]);

  const confirmPayment = async () => {
    await fetch(`${API_URL}/payments/mock-confirm/${params.orderId}`, { method: 'POST' });
    const updated = await fetch(`${API_URL}/orders/${params.orderId}`).then((res) => res.json());
    setOrder(updated);
  };

  return (
    <PageShell>
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h1 className="text-2xl font-semibold">Resumo da compra</h1>
          {order?.watch && (
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-border-soft bg-bg-card/70 p-4">
              <div
                className="h-20 w-20 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Array.isArray(order.watch.images) ? order.watch.images[0] : order.watch.images})`,
                }}
              />
              <div>
                <p className="font-semibold">
                  {order.watch.brand} {order.watch.model}
                </p>
                <p className="text-sm text-text-muted">R$ {order.watch.price.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-xl border border-border-soft bg-bg-glass p-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Escrow Complete</p>
            <img
              className="mx-auto mt-4 h-52 w-52 rounded-xl border border-border-soft bg-white p-2"
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=PIXDEMO"
              alt="QR Code Pix"
            />
            <p className="mt-4 text-xs text-text-muted">{pix?.qrCode}</p>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Status do pedido</h2>
          <div className="mt-4 space-y-2 text-sm text-text-muted">
            <p>Pedido: {order?.status || 'PENDING'}</p>
            <p>Escrow: {order?.escrowStatus || 'NONE'}</p>
          </div>
          <PrimaryButton className="mt-6 w-full" onClick={confirmPayment}>
            Simular pagamento Pix
          </PrimaryButton>
        </Card>
      </div>
    </PageShell>
  );
}
