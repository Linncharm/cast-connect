'use client';

import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { SearchHistory } from '@/types';
import { SearchHistoryList } from '@/components/Search/SearchHistoryList';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  searchHistory: SearchHistory[];
  showHistory: boolean;
  onHistoryItemClick: (name: string) => void;
  onHistoryItemDelete: (id: number) => void;
  searchBarRef: React.RefObject<HTMLInputElement | null>;
  onFocus: () => void;
  onBlur: () => void;
}

const SearchBar:React.FC<SearchBarProps> = (props) => {
  const {
    searchTerm,
    onSearch,
    searchHistory,
    showHistory,
    onHistoryItemClick,
    onHistoryItemDelete,
    searchBarRef,
    onFocus,
    onBlur
  } = props
  return (
    <>
      <label htmlFor="show-search" className="sr-only">搜索电视剧</label>
      <SearchIcon aria-hidden="true" className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      <input
        ref={searchBarRef}
        id="show-search"
        type="search"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="搜索电视剧..."
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
        aria-label="搜索电视剧"
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
      />

      {/* 搜索历史记录 */}
      <SearchHistoryList
        show={showHistory && !searchTerm}
        history={searchHistory}
        onItemClick={onHistoryItemClick}
        onItemDelete={onHistoryItemDelete}
      />
    </>
)
  ;
}

export default SearchBar