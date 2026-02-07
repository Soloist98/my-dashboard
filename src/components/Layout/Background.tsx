import type { ReactNode } from 'react';
import bgImage from '@/assets/bg.jpg';

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
          backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-slate-900/40" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
