import SelectedShowCard from '@/components/Shows/components/SelectedShowCard';
import { useTranslations } from 'next-intl';

interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}

interface SelectedShowsListProps {
  shows: TVShow[];
  onRemoveShow: (id: number) => void;
}

export function SelectedShowsList({
  shows,
  onRemoveShow,
}: SelectedShowsListProps) {
  const t = useTranslations('SelectedShowsList');

  if (shows.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8  ">
        {t('noSelectedShows')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {shows.map(show => (
        <SelectedShowCard
          key={show.id}
          show={show}
          onRemove={() => onRemoveShow(show.id)}
        />
      ))}
    </div>
  );
}
