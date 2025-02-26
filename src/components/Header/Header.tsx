import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('header');

  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-200">
        {t('title')}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">
        {t('description')}
      </p>
    </header>
  );
}
