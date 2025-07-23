import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing } from '@/i18n/routing';
import Head from 'next/head';
import { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

// export async function generateMetadata({
//    params: {locale}
//  }: Omit<Props, 'children'>) {
//   const t = await getTranslations({locale, namespace: 'LocaleLayout'});
//
//   return {
//     title: t('title')
//   };
// }

export const metadata: Metadata = {
  other: {
    'google-site-verification': 'HmZtFQKriNlDXKx7zaHF_ml3BZQ1YUgbskFfbKhRla0'
  }
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid

  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div>
      <BaseLayout locale={locale}>{children}</BaseLayout>
    </div>
  );
}
