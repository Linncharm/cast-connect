'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../LanguageSwitcher';

const NavBar = () => {
  const t = useTranslations('nav');

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧 Logo 和网站名称 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors px-4 py-2"
            >
              {t('title')}
            </Link>
          </div>

          {/* 右侧导航链接和语言切换器 */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              {t('home')}
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              {t('about')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
