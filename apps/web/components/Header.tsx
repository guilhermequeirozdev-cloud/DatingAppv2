import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border-soft bg-bg-main/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-widest text-gold">
          LUXWATCH
        </Link>
        <nav className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="/dashboard/seller">Seller</Link>
          <Link href="/dashboard/admin">Admin</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
