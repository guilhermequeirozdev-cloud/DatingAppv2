'use client';

import { useEffect, useState } from 'react';
import PageShell from '../../../../components/PageShell';
import Card from '../../../../components/Card';
import PrimaryButton from '../../../../components/PrimaryButton';
import { API_URL } from '../../../../lib/api';

interface WatchItem {
  id: string;
  brand: string;
  model: string;
  status: string;
}

export default function AdminWatchesPage() {
  const [watches, setWatches] = useState<WatchItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/admin/watches`)
      .then((res) => res.json())
      .then(setWatches)
      .catch(() => null);
  }, []);

  const approve = async (id: string) => {
    await fetch(`${API_URL}/admin/watches/${id}/approve`, { method: 'POST' });
    setWatches((prev) => prev.filter((item) => item.id !== id));
  };

  const reject = async (id: string) => {
    await fetch(`${API_URL}/admin/watches/${id}/reject`, { method: 'POST' });
    setWatches((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PageShell>
      <h1 className="text-2xl font-semibold">Validação de relógios</h1>
      <div className="mt-6 grid gap-4">
        {watches.map((watch) => (
          <Card key={watch.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {watch.brand} {watch.model}
                </p>
                <p className="text-sm text-text-muted">Status: {watch.status}</p>
              </div>
              <div className="flex gap-2">
                <PrimaryButton onClick={() => approve(watch.id)}>Aprovar</PrimaryButton>
                <button className="rounded-full border border-border-soft px-4 py-2 text-sm" onClick={() => reject(watch.id)}>
                  Reprovar
                </button>
              </div>
            </div>
          </Card>
        ))}
        {watches.length === 0 && <Card><p className="text-text-muted">Sem relógios pendentes.</p></Card>}
      </div>
    </PageShell>
  );
}
