import { useState, useEffect, useCallback } from 'react';
import TMDBService from '@/services/tmdb';

interface SearchHistory {
  id: number;
  name: string;
  timestamp: string;
}

interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // ... 实现搜索相关逻辑
  // Search TMDB API
  const searchTMDB = useCallback(async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const tmdbService = TMDBService.getInstance();
      const response = await tmdbService.searchTV(query, 1, 'zh-CN');
      setSearchResults(response.results.slice(0, 6)); // 只显示前6个结果
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOnBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 200)
  }

  const handleOnFocus = () => {
    setShowHistory(true);
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleHistoryItemClick = (value: string) => {
    handleSearch(value);
  }

  const handleHistoryItemDelete = (
    // e:MouseEvent,
    itemId:number
  ) => {
    // e.stopPropagation();
    const newHistory = searchHistory.filter(
      h => h.id !== itemId,
    );
    setSearchHistory(newHistory);
    localStorage.setItem('tvSearchHistory', JSON.stringify(newHistory));
  }


  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Watch for debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchTMDB(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, searchTMDB]);

  return {
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
  };
}