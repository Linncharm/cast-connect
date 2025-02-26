'use client';

import React from 'react';
import NavBar from '@/components/Layout/NavBar';
import Footer from '@/components/Layout/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
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
