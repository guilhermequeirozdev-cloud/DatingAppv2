import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-main text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      <Footer />
    </div>
  );
}
