import PageShell from '../../../components/PageShell';
import Card from '../../../components/Card';
import PrimaryButton from '../../../components/PrimaryButton';
import { fetchJson } from '../../../lib/api';

interface WatchDetail {
  id: string;
  brand: string;
  model: string;
  price: number;
  condition: string;
  description: string;
  images: string;
  seller?: { name: string };
}

export default async function WatchDetailPage({ params }: { params: { id: string } }) {
  const watch = await fetchJson<WatchDetail>(`/watches/${params.id}`);

  return (
    <PageShell>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${watch.images})`, minHeight: 420 }} />
        <Card>
          <h1 className="text-3xl font-semibold">
            {watch.brand} {watch.model}
          </h1>
          <p className="mt-2 text-text-muted">{watch.condition}</p>
          <p className="mt-4 text-text-muted">{watch.description}</p>
          <p className="mt-6 text-2xl font-semibold text-gold">R$ {watch.price.toLocaleString('pt-BR')}</p>
          <div className="mt-6 flex flex-col gap-3">
            <PrimaryButton>Iniciar checkout</PrimaryButton>
            <p className="text-xs text-text-muted">Seller: {watch.seller?.name || 'Vendedor demo'}</p>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
