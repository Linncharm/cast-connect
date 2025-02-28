import React, { useEffect, useState } from 'react';
import { Role } from '@/types';

interface CommonCastResult {
  id: number;
  name: string;
  profile_path: string | null;
  showAppearances: {
    showName: string;
    showId: number; // 添加 showId
    roles: Role[];
  }[];
  totalEpisodes: number;
}

export function useCommonSearch(results: CommonCastResult[]) {

  console.log('results', results)

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
    handleSearchChange
  }
}