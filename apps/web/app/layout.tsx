import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'LuxWatch Marketplace',
  description: 'Marketplace C2C de relógios de luxo (demo)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
