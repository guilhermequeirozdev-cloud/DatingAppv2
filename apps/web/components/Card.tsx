import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return <div className="glass p-6">{children}</div>;
}
