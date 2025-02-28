import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Role } from '@/types';
import { FilterHandlers } from '@/components/Cast/types';

interface CommonCastResult {
  id: number;
  name: string;
  profile_path: string | null;
  showAppearances: {
    showName: string;
    showId: number; // 添加 showId
    roles: Role[];
  }[];
  showCount: number;
  popularity: number;
}

type SortType ='name' | 'showCount' | 'popularity';

interface FilterOptions {
  sortOrder: [SortType, 'asc' | 'desc'];
  actorTypes: {
    allActors: boolean;
    mainCast: boolean;
    guestStars: boolean;
  };
  minSeasons: number;
}


export function useCommonSearch(results: CommonCastResult[]) {

  // 筛选结果优先级大于搜索的结果
  // console.log('results', results)

  // 筛选状态，FilterModal引入hook创建了不同的引用
  const [sortOrder, setSortOrder] = useState<[SortType, 'asc' | 'desc']>(["showCount",'desc']);
  const [actorTypes, setActorTypes] = useState({
    allActors: true,
    mainCast: false,
    guestStars: false
  });
  const [minSeasons, setMinSeasons] = useState<number>(1);

  const initialFilterOptions = useRef<FilterOptions>({
    sortOrder: ["showCount", "desc"],
    actorTypes: {
      allActors: true,
      mainCast: false,
      guestStars: false
    },
    minSeasons: 1
  })

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CommonCastResult[]>([]);
  const [autoExpandedActors, setAutoExpandedActors] = useState<Set<number>>(new Set());
  const [allExpanded, setAllExpanded] = useState(false);

  // 共同演员搜索处理逻辑
  // Common actor search logic

  // 展开/折叠所有演员
  const handleExpandToggle = () => {
    if (allExpanded) {
      // If currently all expanded, collapse all
      setAutoExpandedActors(new Set());
      setAllExpanded(false);
    } else {
      // If currently not all expanded, expand all
      const allActorIds = new Set(searchResults.map(actor => actor.id));
      setAutoExpandedActors(allActorIds);
      setAllExpanded(true);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterHandlers:FilterHandlers = {
    actorTypes,
    sortOrder,
    minSeasons,
    // 处理滑块数值变化
    handleSeasonChange: useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setMinSeasons(parseInt(e.target.value));
    }, []),

    // 处理复选框变化
    handleCheckboxChange: useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setActorTypes({
        ...actorTypes,
        [e.target.id]: e.target.checked
      });
    }, [actorTypes]),

    // 处理排序键选择
    handleSortTypeChange: useCallback ((e: React.ChangeEvent<HTMLSelectElement>) => {
      // 值不变，只改变键
      const tempSortValue = sortOrder[1];
      setSortOrder(
        [e.target.value as SortType, tempSortValue]
      )
    },[sortOrder]),

    // 处理排序值选择
    handleSortOrderChange :useCallback( (e: React.ChangeEvent<HTMLSelectElement>) => {
      // 值不变，只改变键
      const tempSortType = sortOrder[0];
      setSortOrder(
        [tempSortType, e.target.value as 'asc' | 'desc']
      )
    },[sortOrder])
  }

  // 确认筛选并收集所有筛选选项
  const handleFilterModalSubmit = () => {

    const filterOptions: FilterOptions = {
      sortOrder,
      actorTypes,
      minSeasons
    };

    // Print current filter options and results
    console.log('Filter Options:', filterOptions);
    console.log('Current Results:', results);

    // 1. Compare with initial value, if no change, do not filter
    if (JSON.stringify(filterOptions) === JSON.stringify(initialFilterOptions.current)) {
      console.log('No changes in filter options.');
      return;
    }

    // update initial value
    initialFilterOptions.current = filterOptions;

    // 2. If there are changes, filter based on conditions
    const filteredResults = filterResults(results, filterOptions);
    setSearchResults(filteredResults);
    console.log('Filtered Results:', filteredResults);
  };

  const filterResults = (results: CommonCastResult[], filterOptions: FilterOptions): CommonCastResult[] => {
    let filteredResults = results.slice(); // 浅copy一份

    // Filter by actor types
    // if (!filterOptions.actorTypes.allActors) {
    //   filteredResults = filteredResults.filter(actor => {
    //     const mainCast = filterOptions.actorTypes.mainCast && actor.showCount > 1;
    //     const guestStars = filterOptions.actorTypes.guestStars && actor.showCount === 1;
    //     return mainCast || guestStars;
    //   });
    // }

    // Filter by minimum seasons
    filteredResults = filteredResults.filter(actor => {
      return actor.showCount >= filterOptions.minSeasons;
    });

    // Sort results ✅
    filteredResults = filteredResults.sort((a, b) => {
      const [key, order] = filterOptions.sortOrder;
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });

    return filteredResults;
  };


  // Search logic
  useEffect(() => {

    if (!searchTerm.trim()) {
      // If search is empty, show all results and clear auto-expansions
      setSearchResults(results);
      setAutoExpandedActors(new Set());
      return;
    }

    const term = searchTerm.toLowerCase();
    const matchingActors: CommonCastResult[] = [];
    const newAutoExpanded = new Set<number>();

    // Search through all actors and their roles
    results.forEach(actor => {
      // Check actor name
      const nameMatch = actor.name.toLowerCase().includes(term);

      // Check show names and character names
      let hasRoleMatch = false;
      actor.showAppearances.some(appearance => {
        const showMatch = appearance.showName.toLowerCase().includes(term);

        let characterMatch = false;
        appearance.roles.some(role => {
          if (role.character.toLowerCase().includes(term)) {
            characterMatch = true;
            return true;
          }
          return false;
        });

        if (showMatch || characterMatch) {
          hasRoleMatch = true;
          return true;
        }
        return false;
      });

      if (nameMatch || hasRoleMatch) {
        matchingActors.push(actor);

        // Auto-expand actors with matching roles if the actor itself doesn't match
        if (hasRoleMatch && !nameMatch) {
          newAutoExpanded.add(actor.id);
        }
      }
    });

    setSearchResults(matchingActors);
    setAutoExpandedActors(newAutoExpanded);
  }, [searchTerm, results]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    autoExpandedActors,
    allExpanded,

    handleExpandToggle,
    handleSearchChange,

    actorTypes,
    sortOrder,
    minSeasons,

    filterHandlers,
    handleFilterModalSubmit
  }
}