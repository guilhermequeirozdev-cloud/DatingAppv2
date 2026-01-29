'use client';

import { useEffect, useMemo, useState } from 'react';
import PageShell from '../components/PageShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';
import { API_URL } from '../lib/api';

interface WatchItem {
  id: string;
  brand: string;
  model: string;
  price: number;
  condition: string;
  description: string;
  images: string[];
}

export default function HomePage() {
  const [watches, setWatches] = useState<WatchItem[]>([]);
  const [filters, setFilters] = useState({ brand: '', model: '', price: '' });
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    fetch(`${API_URL}/watches`)
      .then((res) => res.json())
      .then(setWatches)
      .catch(() => null);
  }, []);

  const filtered = useMemo(() => {
    return watches.filter((watch) => {
      const matchesBrand = filters.brand ? watch.brand.toLowerCase().includes(filters.brand.toLowerCase()) : true;
      const matchesModel = filters.model ? watch.model.toLowerCase().includes(filters.model.toLowerCase()) : true;
      const matchesPrice = filters.price ? watch.price <= Number(filters.price) : true;
      return matchesBrand && matchesModel && matchesPrice;
    });
  }, [watches, filters]);

  const applyFilters = () => setFilters(draft);

  return (
    <PageShell>
      <section
        className="relative overflow-hidden rounded-xl border border-border-soft bg-bg-card/70 p-10"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(11,11,15,0.9), rgba(11,11,15,0.6)), url(https://images.unsplash.com/photo-1518544801976-3e0f042f0c2f)',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.4em] text-text-muted">Compra segura & autenticada</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">Compre Relógios de Luxo Autênticos</h1>
          <p className="mt-4 text-text-muted">
            Escrow, IA híbrida e mediação premium para garantir segurança total em cada negociação.
          </p>
          <div className="mt-8 grid gap-3 rounded-full border border-border-soft bg-bg-glass/80 p-3 md:grid-cols-[1fr_1fr_1fr_auto]">
            <input
              className="rounded-full border border-border-soft bg-bg-card px-4 py-2 text-sm"
              placeholder="Marca"
              value={draft.brand}
              onChange={(event) => setDraft({ ...draft, brand: event.target.value })}
            />
            <input
              className="rounded-full border border-border-soft bg-bg-card px-4 py-2 text-sm"
              placeholder="Modelo"
              value={draft.model}
              onChange={(event) => setDraft({ ...draft, model: event.target.value })}
            />
            <input
              className="rounded-full border border-border-soft bg-bg-card px-4 py-2 text-sm"
              placeholder="Preço máximo"
              type="number"
              value={draft.price}
              onChange={(event) => setDraft({ ...draft, price: event.target.value })}
            />
            <PrimaryButton className="text-sm" onClick={applyFilters}>
              Buscar
            </PrimaryButton>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Relógios Destaque</h2>
          <Link href="/dashboard/seller/new-watch" className="text-sm text-gold">
            Vender um relógio
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((watch) => (
            <Card key={watch.id}>
              <div className="flex flex-col gap-4">
                <div
                  className="h-40 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${watch.images?.[0]})` }}
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {watch.brand} {watch.model}
                  </h3>
                  <p className="text-sm text-text-muted">{watch.condition}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gold">R$ {watch.price.toLocaleString('pt-BR')}</span>
                  <Link href={`/watch/${watch.id}`} className="text-sm text-gold">
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card>
              <p className="text-text-muted">Nenhum relógio aprovado encontrado. Rode a API e o seed.</p>
            </Card>
          )}
        </div>
      </section>
    </PageShell>
  );
}
