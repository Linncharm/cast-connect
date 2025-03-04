'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export function FAQSection() {
  const t = useTranslations('FAQ');

  const faqs = [
    {
      question: t('question1.question'),
      answer: t('question1.answer')
    },
    {
      question: t('question2.question'),
      answer: t('question2.answer')
    },
    {
      question: t('question3.question'),
      answer: t('question3.answer')
    },
    {
      question: t('question4.question'),
      answer: t('question4.answer')
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('heading')}</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center font-medium focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}