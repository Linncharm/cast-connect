'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-2xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 第一列：关于网站 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.about.title')}
            </h3>
            <p className="text-gray-400">
              {t('footer.about.description')}
            </p>
          </div>

          {/* 第二列：快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.quickLinks.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('footer.quickLinks.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('footer.quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('footer.quickLinks.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 第三列：联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.contact.title')}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t('footer.contact.email')}</li>
              <li>{t('footer.contact.github')}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;