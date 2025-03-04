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
    },
    {
      question: t('question5.question'),
      answer: t('question5.answer')
    },
    {
      question: t('question6.question'),
      answer: t('question6.answer')
    },
    {
      question: t('question7.question'),
      answer: t('question7.answer')
    },
    {
      question: t('question8.question'),
      answer: t('question8.answer')
    },
  ];

  // 使用对象而不是单一索引来存储每个FAQ的开启状态
  const [openState, setOpenState] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setOpenState(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <section id="faq" className="py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">{t('heading')}</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center font-medium focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openState[index]}
              >
                <span>{faq.question}</span>
                <span className="ml-6 flex-shrink-0 transition-transform duration-300"
                      style={{ transform: openState[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openState[index] ? '500px' : '0',
                  opacity: openState[index] ? '1' : '0'
                }}
              >
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}