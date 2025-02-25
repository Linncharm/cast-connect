import { useTranslations } from 'next-intl';

type QueryMode = 'strict' | 'fuzzy';

interface QueryModeSelectProps {
  value: QueryMode;
  onChange: (value: QueryMode) => void;
}

export function QueryModeSelect({ value, onChange }: QueryModeSelectProps) {

  const t = useTranslations('ModeSelect');

  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value as QueryMode)}
        className="appearance-none bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 pr-8 focus:outline-none focus:border-blue-500 transition-colors"
        aria-label="查询模式"
      >
        <option value="strict">
          {t('strict')}
        </option>
        <option value="fuzzy">
          {t('fuzzy')}
        </option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
