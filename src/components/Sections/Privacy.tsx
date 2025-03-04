'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export function PrivacySection() {
  const t = useTranslations('Privacy');

  const policies = [
    {
      icon: '🛡️',
      title: t('dataProtection.title'),
      description: t('dataProtection.description')
    },
    {
      icon: '👁️‍🗨️',
      title: t('noTracking.title'),
      description: t('noTracking.description')
    },
    {
      icon: '🔐',
      title: t('secure.title'),
      description: t('secure.description')
    }
  ];

  return (
    <section id="privacy" className="py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">{t('heading')}</h2>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
            {t('intro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{policy.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{policy.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{policy.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/privacy-policy"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              {t('readFull')} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}