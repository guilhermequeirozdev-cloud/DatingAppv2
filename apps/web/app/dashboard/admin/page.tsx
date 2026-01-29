import PageShell from '../../../components/PageShell';
import Card from '../../../components/Card';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <PageShell>
      <h1 className="text-2xl font-semibold">Painel Admin</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Fila de validação</h2>
          <p className="text-text-muted">Gerencie relógios pendentes.</p>
          <Link href="/dashboard/admin/watches" className="text-sm text-gold">
            Ver fila
          </Link>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Disputas</h2>
          <p className="text-text-muted">Resolva disputas abertas.</p>
          <Link href="/dashboard/admin/disputes" className="text-sm text-gold">
            Ver disputas
          </Link>
        </Card>
      </div>
    </PageShell>
  );
}
