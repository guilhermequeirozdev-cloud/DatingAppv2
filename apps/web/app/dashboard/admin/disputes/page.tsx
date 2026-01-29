'use client';

import { useEffect, useState } from 'react';
import PageShell from '../../../../components/PageShell';
import Card from '../../../../components/Card';
import PrimaryButton from '../../../../components/PrimaryButton';
import { API_URL } from '../../../../lib/api';

interface DisputeItem {
  id: string;
  reason: string;
  status: string;
}

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<DisputeItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/admin/disputes`)
      .then((res) => res.json())
      .then(setDisputes)
      .catch(() => null);
  }, []);

  const resolve = async (id: string, action: 'REFUND' | 'RELEASE') => {
    await fetch(`${API_URL}/admin/disputes/${id}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    setDisputes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PageShell>
      <h1 className="text-2xl font-semibold">Disputas</h1>
      <div className="mt-6 grid gap-4">
        {disputes.map((dispute) => (
          <Card key={dispute.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{dispute.reason}</p>
                <p className="text-sm text-text-muted">Status: {dispute.status}</p>
              </div>
              <div className="flex gap-2">
                <PrimaryButton onClick={() => resolve(dispute.id, 'RELEASE')}>Liberar</PrimaryButton>
                <button className="rounded-full border border-border-soft px-4 py-2 text-sm" onClick={() => resolve(dispute.id, 'REFUND')}>
                  Reembolsar
                </button>
              </div>
            </div>
          </Card>
        ))}
        {disputes.length === 0 && <Card><p className="text-text-muted">Sem disputas abertas.</p></Card>}
      </div>
    </PageShell>
  );
}
