'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export function FeatureSection() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: '🔍',
      title: t('search.title'),
      description: t('search.description')
    },
    {
      icon: '🔄',
      title: t('compare.title'),
      description: t('compare.description')
    },
    {
      icon: '⚡',
      title: t('fast.title'),
      description: t('fast.description')
    },
    {
      icon: '📱',
      title: t('responsive.title'),
      description: t('responsive.description')
    },
    {
      icon: '📊',
      title: t('export.title'),
      description: t('export.description')
    },
    {
      icon: '🌐',
      title: t('multiLang.title'),
      description: t('multiLang.description')
    }
  ];

  return (
    <section id="features" className="py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">{t('heading')}</h1>
        <h2 className="text-1xl text-gray-600 mb-6 text-center">{t('subheading')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}