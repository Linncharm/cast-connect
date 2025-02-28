import React from 'react';

export interface FilterHandlers {
  handleSeasonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  actorTypes: {
    allActors: boolean,
    mainCast: boolean,
    guestStars: boolean
  };
  minSeasons: number;
  sortOrder: [string, 'asc' | 'desc'];
}