'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

const NavBar = () => {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // 确保点击的不是菜单或菜单按钮
    if (
      menuRef.current && !menuRef.current.contains(event.target as Node) &&
      buttonRef.current && !buttonRef.current.contains(event.target as Node)
    ) {
      setMobileMenuOpen(false);
    }
  }

  const handleScroll = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  };

  // 点击外部关闭菜单
  useEffect(() => {

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll,{capture:true});

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll,{capture:true});
    };
  }, [mobileMenuOpen]);


  // 切换菜单状态
  const toggleMenu = () => {
    // 再次点击会被认定为menuRef的外部元素从而抵消
    setMobileMenuOpen(prev => !prev); // 事件冒泡导致状态无法更新
  };

  return (
    <nav
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 md:static md:z-auto z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧 Logo 和网站名称 */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 px-2 md:px-4"
            >
              {t('title')}
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            onClick={toggleMenu}
            ref={buttonRef}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {/* 桌面端导航链接 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2"
            >
              {t('home')}
            </Link>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2"
            >
              {t('about')}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* 移动端下拉菜单 */}
          <div
            ref={menuRef}
            className={`md:hidden absolute left-0 right-0 px-4 mt-4 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2">
              {/* 导航链接 */}
              <div className="px-2 pt-4 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('home')}
                </Link>
                <Link
                  href="/about"
                  className="block w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
              </div>

              {/* 分隔线 */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              {/* 主题切换和语言切换 */}
              <div className="px-4 py-3 flex flex-col space-y-3">
                <div className="flex items-center justify-start">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('theme')}
              </span>
                  <ThemeToggle />
                </div>

                <div className="pt-1">
                  <div className="flex items-center justify-start">
              <span className="block text-sm text-gray-600 dark:text-gray-400">
                {t('language')}
              </span>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
    </nav>
  );
};

export default NavBar;