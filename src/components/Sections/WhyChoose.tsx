'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export function WhyChooseSection() {
  const t = useTranslations('WhyChoose');

  const reasons = [
    {
      icon: '🎯',
      title: t('accuracy.title'),
      description: t('accuracy.description')
    },
    {
      icon: '🔒',
      title: t('privacy.title'),
      description: t('privacy.description')
    },
    {
      icon: '🚀',
      title: t('performance.title'),
      description: t('performance.description')
    }
  ];

  return (
    <section id="why-choose" className="py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">{t('heading')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <div className="text-4xl mb-4 text-center">{reason.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-center">{reason.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}