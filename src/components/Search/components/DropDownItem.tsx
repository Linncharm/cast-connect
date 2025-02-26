import TMDBService from '@/services/tmdb';
import React from 'react';

interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}

interface DropDownItemProps {
  show: TVShow;
  index: number;
  addShow: (show: TVShow) => void;
}

const DropDownItem: React.FC<DropDownItemProps> = props => {
  const { show, index, addShow } = props;

  return (
    <div
      key={show.id}
      onClick={() => addShow(show)}
      className="p-3
        hover:bg-gray-100 dark:hover:bg-gray-700
        cursor-pointer
        transition-colors duration-200"
    >
      <div className="flex items-center gap-4">
        {index < 3 && (
          <img
            src={TMDBService.getImageUrl(show.poster_path, 'w92')}
            alt={`${show.name}的海报`}
            className="w-12 h-16 rounded object-cover flex-shrink-0"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <div
            className="font-medium
            text-gray-900 dark:text-white
            truncate
            transition-colors duration-200"
          >
            {show.name}
          </div>
          <div
            className="text-sm
            text-gray-500 dark:text-gray-400
            transition-colors duration-200"
          >
            {show.first_air_date?.split('-')[0] || '未知年份'}
          </div>
          {show.overview && (
            <p
              className="text-sm
                text-gray-500 dark:text-gray-400
                line-clamp-1 mt-1 cursor-help
                transition-colors duration-200"
              title={show.overview}
            >
              {show.overview}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDownItem;
