import SelectedShowCard from '@/components/Shows/components/SelectedShowCard';

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

export function SelectedShowsList({ shows, onRemoveShow }: SelectedShowsListProps) {
  if (shows.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        请搜索并选择剧集以开始分析
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