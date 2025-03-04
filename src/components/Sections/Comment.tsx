'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CommentSection() {
  const t = useTranslations('UserComments');

  const comments = [
    {
      avatar: '/avatar1.webp',
      name: t('contents.one.name'),
      comment: t('contents.one.comment')
    },
    {
      avatar: '/avatar2.webp',
      name: t('contents.two.name'),
      comment: t('contents.two.comment')
    },
    {
      avatar: '/avatar3.webp',
      name: t('contents.three.name'),
      comment: t('contents.three.comment')
    },
    {
      avatar: '/avatar4.webp',
      name: t('contents.four.name'),
      comment: t('contents.four.comment')
    },
    {
      avatar: '/avatar5.webp',
      name: t('contents.five.name'),
      comment: t('contents.five.comment')
    },
    {
      avatar: '/avatar6.webp',
      name: t('contents.six.name'),
      comment: t('contents.six.comment')
    },
    {
      avatar: '/avatar7.webp',
      name: t('contents.seven.name'),
      comment: t('contents.seven.comment')
    },
    {
      avatar: '/avatar8.webp',
      name: t('contents.eight.name'),
      comment: t('contents.eight.comment')
    },
    {
      avatar: '/avatar9.webp',
      name: t('contents.nine.name'),
      comment: t('contents.nine.comment')
    }
  ];

  return (
    <section id="user-comments" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t('heading')}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">{t('subheading')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comments.map((comment, index) => (
            <div key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-2 md:flex-row items-center md:gap-4">
                <Image
                  src={comment.avatar}
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold dark:text-white mb-2">{comment.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}