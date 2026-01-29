'use client';

import { useEffect, useState } from 'react';
import PageShell from '../../../components/PageShell';
import Card from '../../../components/Card';
import PrimaryButton from '../../../components/PrimaryButton';
import { API_URL } from '../../../lib/api';

export default function CheckoutPage({ params }: { params: { orderId: string } }) {
  const [pix, setPix] = useState<{ qrCode: string; qrCodeImageUrl: string; status: string } | null>(null);
  const [status, setStatus] = useState('PENDING');

  useEffect(() => {
    fetch(`${API_URL}/payments/pix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: params.orderId }),
    })
      .then((res) => res.json())
      .then(setPix)
      .catch(() => null);
  }, [params.orderId]);

  const confirmPayment = async () => {
    await fetch(`${API_URL}/payments/mock-confirm/${params.orderId}`, { method: 'POST' });
    setStatus('PAID');
  };

  return (
    <PageShell>
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Card>
          <h1 className="text-2xl font-semibold">Pagamento Pix (mock)</h1>
          <p className="mt-2 text-text-muted">
            Use o QR code abaixo para simular o pagamento. Este fluxo é 100% demo.
          </p>
          <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-border-soft">
            <p className="text-text-muted">QR Code mock</p>
          </div>
          <p className="mt-4 text-xs text-text-muted">{pix?.qrCode}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Status do pedido</h2>
          <p className="mt-2 text-text-muted">{status}</p>
          <PrimaryButton className="mt-6 w-full" onClick={confirmPayment}>
            Simular pagamento Pix
          </PrimaryButton>
        </Card>
      </div>
    </PageShell>
  );
}
