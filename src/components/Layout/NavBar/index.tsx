'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

const NavBar = () => {
  const t = useTranslations('nav');

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧 Logo 和网站名称 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2"
            >
              {t('title')}
            </Link>
          </div>

          {/* 右侧导航链接和语言切换器 */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2"
            >
              {t('home')}
            </Link>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2"
            >
              {t('about')}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
