import PageShell from '../components/PageShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';
import { fetchJson } from '../lib/api';

interface WatchItem {
  id: string;
  brand: string;
  model: string;
  price: number;
  condition: string;
  description: string;
  images: string;
}

export default async function HomePage() {
  let watches: WatchItem[] = [];
  try {
    watches = await fetchJson<WatchItem[]>('/watches');
  } catch {
    watches = [];
  }

  return (
    <PageShell>
      <section className="mb-10 grid gap-6 rounded-xl bg-bg-card/60 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Luxo sob curadoria</p>
        <h1 className="text-4xl font-semibold">Marketplace C2C de relógios de luxo</h1>
        <p className="max-w-2xl text-text-muted">
          Escrow, IA de autenticação híbrida e experiência premium para compradores e sellers no Brasil.
        </p>
        <div className="flex gap-4">
          <PrimaryButton>Explorar relógios</PrimaryButton>
          <Link href="/dashboard/seller/new-watch" className="rounded-full border border-border-soft px-5 py-3 text-sm">
            Vender um relógio
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {watches.map((watch) => (
          <Card key={watch.id}>
            <div className="flex flex-col gap-4">
              <div className="h-40 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${watch.images})` }} />
              <div>
                <h3 className="text-lg font-semibold">
                  {watch.brand} {watch.model}
                </h3>
                <p className="text-sm text-text-muted">{watch.condition}</p>
              </div>
              <p className="text-sm text-text-muted">{watch.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gold">R$ {watch.price.toLocaleString('pt-BR')}</span>
                <Link href={`/watch/${watch.id}`} className="text-sm text-gold">
                  Ver detalhes
                </Link>
              </div>
            </div>
          </Card>
        ))}
        {watches.length === 0 && (
          <Card>
            <p className="text-text-muted">Nenhum relógio carregado. Rode a API e o seed para ver os dados.</p>
          </Card>
        )}
      </section>
    </PageShell>
  );
}
