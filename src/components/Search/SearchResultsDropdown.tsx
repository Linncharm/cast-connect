import React from 'react';
import DropDownItem from '@/components/Search/components/DropDownItem';
import { TVShow } from '@/types';
import { useTranslations } from 'next-intl';

type isLoading = boolean;

interface SearchResultsDropdownProps {
  searchResults: TVShow[];
  isLoading: isLoading;
  addShow: (show: TVShow) => void;
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = props => {
  const t = useTranslations('SearchBar');
  const { searchResults, addShow, isLoading } = props;

  return (
    <div
      className="absolute w-full mt-2
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg
      shadow-lg dark:shadow-xl
      z-10 max-h-[400px]
      overflow-y-auto custom-scrollbar
       "
    >
      <div className="relative">
        {isLoading && (
          <div
            className="absolute inset-0
            bg-white/75 dark:bg-gray-800/75
            flex items-center justify-center z-50
            backdrop-blur-sm
             "
          >
            <div className="text-gray-500 dark:text-gray-400 text-sm py-4">
              {t('searching')}
            </div>
          </div>
        )}

        {searchResults.map((show, index) => (
          <DropDownItem show={show} index={index} addShow={addShow} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsDropdown;
