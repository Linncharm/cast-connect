import React from 'react';

import TMDBService from '@/services/tmdb';

interface SelectedShowCard {
  show: TVShow,
  onRemove:() => void
}

interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}


const SelectedShowCard: React.FC<SelectedShowCard> = (props) => {

  const { show, onRemove } = props;

  return (
    <div
      key={show.id}
      className="bg-gray-700 rounded-lg p-3 relative group"
    >
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`移除 ${show.name}`}
      >
        <span aria-hidden="true">×</span>
      </button>
      <div className="flex items-center gap-3">
        <img
          src={TMDBService.getImageUrl(show.poster_path,'w92')}
          alt={`${show.name}的海报`}
          className="w-12 h-16 rounded object-cover flex-shrink-0"
          loading="lazy"
        />
        <div>
          <div className="font-medium">{show.name}</div>
          <div className="text-sm text-gray-400">
            {show.first_air_date?.split('-')[0] || '未知年份'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedShowCard