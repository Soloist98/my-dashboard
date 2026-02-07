import type { ReactNode } from 'react';
import bgImage from '@/assets/bg.jpg';

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <div className="min-h-screen">
      {/* 固定背景 */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-slate-900/40" />
      </div>
      
      {/* 可滚动内容 */}
      <div className="relative z-10 py-6">
        {children}
      </div>
    </div>
  );
}
