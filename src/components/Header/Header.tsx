import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('header');

  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white  ">
        {t('title')}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300  ">
        {t('description')}
      </p>
    </header>
  );
}
