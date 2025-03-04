'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function HowToUseSection() {
  const t = useTranslations('HowToUse');

  return (
    <section id="how-to-use" className="py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-4 text-center">{t('heading')}</h1>
        <h2 className="max-w-3xl m-auto text-gray-600 mb-6 text-center">{t('subheading')}</h2>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4">
          {/* Card Header */}
          <div className="my-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              {t('cardHeading')}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 p-4 md:grid-cols-3 gap-16">
            {/*TODO - Add the dark mode images*/}
            {/* Step 1 */}
            <div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 overflow-hidden">
                <Image
                  src="/search-step.webp"
                  alt="Search step"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>
              <h4 className="text-xl font-semibold mb-4">{t('step1.title')}</h4>
              <ul className="space-y-2 text-gray-500 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step1.point1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step1.point2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step1.point3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step1.point4')}</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 overflow-hidden">
                <Image
                  src="/select-step.webp"
                  alt="Select step"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>
              <h4 className="text-xl font-semibold mb-4">{t('step2.title')}</h4>
              <ul className="space-y-2 text-gray-500 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step2.point1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step2.point2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step2.point3')}</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 overflow-hidden">
                <Image
                  src="/analysis-step.webp"
                  alt="Analysis step"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>
              <h4 className="text-xl font-semibold mb-4">{t('step3.title')}</h4>
              <ul className="space-y-2 text-gray-500 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step3.point1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step3.point2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step3.point3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('step3.point4')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}