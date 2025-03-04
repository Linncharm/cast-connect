'use client'

import { useTranslations } from 'next-intl';
import React from 'react';
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
import '../globals.css';
import { FeatureSection } from '@/components/Sections/Feature';
import { HowToUseSection } from '@/components/Sections/HowToUse';
import { WhyChooseSection } from '@/components/Sections/WhyChoose';
import { FAQSection } from '@/components/Sections/FAQ';
import { PrivacySection } from '@/components/Sections/Privacy';
import { CommentSection } from '@/components/Sections/Comment';

export default function Home() {
  const t = useTranslations('Analysis');

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

    setSelectedShows,
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

    const updatedHistory = [
      newHistoryItem,
      ...searchHistory.filter(item => item.id !== show.id), // 移除重复项
    ].slice(0, 8); // 只保留最新的8条记录

    setSearchHistory(updatedHistory);
    localStorage.setItem('tvSearchHistory', JSON.stringify(updatedHistory));

    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <MainLayout>
      <Header />
      {/* 操作栏 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          {/* 搜索区域 + 搜索历史记录 */}
          <SearchBar
            searchTerm={searchTerm}
            onSearch={handleSearch}
            searchHistory={searchHistory}
            showHistory={showHistory}
            onHistoryItemClick={handleHistoryItemClick}
            onHistoryItemDelete={handleHistoryItemDelete}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
          {(searchResults.length > 0 || isLoading) && (
            <SearchResultsDropdown
              searchResults={searchResults}
              isLoading={isLoading}
              addShow={handleAddShow}
            />
          )}
        </div>
        {/* 查询模式和分析按钮 - 在移动上下排列 */}
        <div className="flex flex-col justify-around sm:flex-row gap-4 w-full md:w-auto">
          <QueryModeSelect value={queryMode} onChange={handleQueryModeChange} />
          <button
            onClick={handleAnalysis}
            disabled={selectedShows.length < 2}
            className="px-6 py-3
      bg-blue-600 hover:bg-blue-700
      disabled:bg-gray-300 dark:disabled:bg-gray-600
      disabled:text-gray-500 dark:disabled:text-gray-400
      text-white
      rounded-lg font-medium
       "
          >
            {t('analyze')}
          </button>
        </div>
      </div>

      {/* 已选剧集容器 */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto border border-gray-200 dark:border-gray-700  ">
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
      {/*Feature*/}
      <FeatureSection />
      {/*How to Use*/}
      <HowToUseSection />
      {/*Why Choose This*/}
      <WhyChooseSection />
      {/*Comment*/}
      <CommentSection />
      {/*FAQ*/}
      <FAQSection />
      {/*Privacy Protection*/}
      <PrivacySection />
    </MainLayout>
  );
}
