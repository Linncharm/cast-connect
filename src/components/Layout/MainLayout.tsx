'use client';

import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="py-8 px-8" aria-label="电视剧搜索区域">
        <div className="max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </section>
    </main>
  );
}