'use client';

import React, { useRef } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Header } from '@/components/Header/Header';
import SearchBar from '@/components/Search/SearchBar';
import { QueryModeSelect } from '@/components/Search/QueryModeSelect';
import { SelectedShowsList } from '@/components/Shows/SelectedShowsList';
import { CommonCastResults } from '@/components/Cast/CommonCastResults';
import { useSearch } from '@/hooks/useSearch';
import { useCastAnalysis } from '@/hooks/useCastAnalysis';
import SearchResultsDropdown from '@/components/Search/SearchResultsDropdown';
import { SearchHistory, TVShow } from '@/types';

export default function Home() {
  const {
    searchTerm,
    searchResults,
    isLoading,
    searchHistory,
    showHistory,
    handleSearch,
    handleHistoryItemClick,
    handleHistoryItemDelete,
    handleOnBlur,
    handleOnFocus,

    setSearchHistory,
    setSearchTerm,
    setSearchResults,

  } = useSearch();

  const {
    selectedShows,
    queryMode,
    commonCastResults,
    expandedActors,
    handleRemoveShow,
    handleQueryModeChange,
    handleAnalysis,
    handleActorExpand,

    setSelectedShows
  } = useCastAnalysis();

  // 要同时修改showHistory和searchHistory
  const handleAddShow = (show: TVShow) => {
    if (!selectedShows.find(s => s.id === show.id)) {
      setSelectedShows([...selectedShows, show]);
    }

    // 添加到搜索历史
    const newHistoryItem: SearchHistory = {
      id: show.id,
      name: show.name,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [newHistoryItem, ...searchHistory
      .filter(item => item.id !== show.id) // 移除重复项
    ].slice(0, 5); // 只保留最新的5条记录

    setSearchHistory(updatedHistory);
    localStorage.setItem('tvSearchHistory', JSON.stringify(updatedHistory));

    setSearchTerm('');
    setSearchResults([]);
  };

  const searchBarRef = useRef<HTMLInputElement>(null);

  return (
    <MainLayout>
      <Header />
      <div className="flex gap-4">
        <div className="relative flex-1">
        {/* 搜索区域 + 搜索历史记录 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          searchHistory={searchHistory}
          showHistory={showHistory}
          onHistoryItemClick={handleHistoryItemClick}
          onHistoryItemDelete={handleHistoryItemDelete}
          searchBarRef={searchBarRef}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {(searchResults.length > 0 || isLoading) &&
          <SearchResultsDropdown
            searchResults={searchResults}
            isLoading={isLoading}
            addShow={handleAddShow}
          />
        }
        </div>
        <QueryModeSelect
          value={queryMode}
          onChange={handleQueryModeChange}
        />
        <button
          onClick={handleAnalysis}
          disabled={selectedShows.length < 2}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
        >
          查询关系
        </button>
      </div>

      {/* 已选剧集容器 */}
      <div className="bg-gray-800 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
        <SelectedShowsList
          shows={selectedShows}
          onRemoveShow={handleRemoveShow}
        />
      </div>

      {/* 共同演员 */}
      <CommonCastResults
        results={commonCastResults}
        expandedActors={expandedActors}
        onActorExpand={handleActorExpand}
      />
    </MainLayout>
  );
}