import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border-soft bg-bg-main/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-widest text-gold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold-soft text-xs">L</span>
          Luxury
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-text-muted md:flex">
          <Link href="/">Comprar</Link>
          <Link href="/dashboard/seller">Vender</Link>
          <Link href="/dashboard/admin">Sobre</Link>
          <Link href="/dashboard/admin/disputes">Suporte</Link>
        </nav>
        <Link href="/login" className="rounded-full border border-gold-soft px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold">
          Entrar
        </Link>
      </div>
    </header>
  );
}
