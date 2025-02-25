'use client';

import { useParams } from 'next/navigation';
import { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, getPathname, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale();
  const router = useRouter();
  const t = useTranslations('common');

  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  // 语言名称映射
  const localeNames: Record<string, string> = {
    en: 'English',
    de: 'Deutsch',
  };

  // 处理点击外部关闭下拉框
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (locale: string) => {
    startTransition(() => {
      router.replace({ pathname }, { locale });
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t('language.switch')}
        disabled={isPending}
      >
        <span>{t('locale', {locale:currentLocale})}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          {routing.locales.map(locale => (
            <button
              key={locale}
              role="menuitem"
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors
                ${currentLocale === locale ? 'text-blue-400' : 'text-gray-300'}`}
              onClick={() => handleLanguageChange(locale)}
              disabled={isPending}
            >
              <span>{t('locale', {locale:locale})}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
