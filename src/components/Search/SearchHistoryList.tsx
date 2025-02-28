import SearchHistoryItem from '@/components/Search/components/SearchHistoryItem';
import { useTranslations } from 'next-intl';

interface SearchHistoryListProps {
  show: boolean;
  history: SearchHistory[];
  onItemClick: (name: string) => void;
  onItemDelete: (id: number) => void;
}

interface SearchHistory {
  id: number;
  name: string;
  timestamp: string;
}

export function SearchHistoryList({
  show,
  history,
  onItemClick,
  onItemDelete,
}: SearchHistoryListProps) {
  const t = useTranslations('SearchBar');
  if (!show || history.length === 0) return null;

  return (
    <div
      className="absolute w-full mt-2
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    rounded-lg
    shadow-lg dark:shadow-xl
    z-10 overflow-hidden
    custom-scrollbar
     "
    >
      <div
        className="p-2
      border-b border-gray-200 dark:border-gray-700
       "
      >
        <span
          className="text-sm
        text-gray-500 dark:text-gray-400
         "
        >
          {t('latestResearched')}
        </span>
      </div>
      {history.map(item => (
        <SearchHistoryItem
          key={`${item.id}-${item.timestamp}`}
          item={item}
          onClick={() => onItemClick(item.name)}
          onDelete={() => onItemDelete(item.id)}
        />
      ))}
    </div>
  );
}
