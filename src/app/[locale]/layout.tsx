import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing } from '@/i18n/routing';
import Head from 'next/head';

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
      <Head>
        <meta name="google-site-verification" content="HmZtFQKriNlDXKx7zaHF_ml3BZQ1YUgbskFfbKhRla0" />
      </Head>
      <BaseLayout locale={locale}>{children}</BaseLayout>
    </div>
  );
}
