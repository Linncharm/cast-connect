'use client';

import React from 'react';
import NavBar from '@/components/Layout/NavBar';
import Footer from '@/components/Layout/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <NavBar />
      <main className="flex-grow">
        {/* 添加 pt-20 来为固定导航栏留出空间 */}
        <section className="py-8 px-8 pt-20" aria-label="电视剧搜索区域">
          <div className="max-w-6xl mx-auto space-y-8">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
