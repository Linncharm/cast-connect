import { Role } from '@/types';
import ActorCard from '@/components/Cast/components/ActorCard';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
import CommonCastSearch from '@/components/Cast/components/CommonCastSearch';
import { useCommonSearch } from '@/hooks/useCommonSearch';
import { CommonCastResult } from '@/types';

interface CommonCastResultsProps {
  results: CommonCastResult[];
  expandedActors: Set<number>;
  onActorExpand: (id: number) => void;
}


export function CommonCastResults({
  results,
  expandedActors,
  onActorExpand,
}: CommonCastResultsProps) {
  const t = useTranslations('CommonCastResults');

  // 传入原始result
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    autoExpandedActors,
    allExpanded,

    handleExpandToggle,
    handleSearchChange,

    handleFilterModalSubmit,
    filterHandlers,
  } = useCommonSearch(results);

  // Combine manually expanded actors with auto-expanded actors
  const effectiveExpandedActors = useMemo(() => {
    const combined = new Set(expandedActors);
    autoExpandedActors.forEach(id => combined.add(id));
    return combined;
  }, [expandedActors, autoExpandedActors]);


  if (results.length === 0) return null;

  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {t('title')}
        {searchTerm.trim() ? (
          <span className="ml-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {t('searchResults', { count: searchResults.length })}
          </span>
        ) : (
          <span className="ml-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {t('searchResults', { count: results.length })}
          </span>
        )

        }
      </h2>

      {/* Search Component with Selection Options */}
      <CommonCastSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allExpanded={allExpanded}
        handleExpandToggle={handleExpandToggle}
        handleSearchChange={handleSearchChange}

        handleFilterModalSubmit={handleFilterModalSubmit}
        filterHandlers={filterHandlers}
        />

        {searchResults.length > 0 ? (
          <div className="max-h-[1000px] overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left column */}
              <div className="flex-1 flex flex-col gap-4">
                {searchResults.filter((_, index) => index % 2 === 0).map(actor => (
                  <ActorCard
                    key={actor.id}
                    actor={actor}
                    isExpanded={effectiveExpandedActors.has(actor.id)}
                    onExpand={() => onActorExpand(actor.id)}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>

              {/* Right column */}
              <div className="flex-1 flex flex-col gap-4">
                {searchResults.filter((_, index) => index % 2 === 1).map(actor => (
                  <ActorCard
                    key={actor.id}
                    actor={actor}
                    isExpanded={effectiveExpandedActors.has(actor.id)}
                    onExpand={() => onActorExpand(actor.id)}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>
            </div>
          </div>

        ) : searchTerm.trim() ? (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              {'No matching results found'}
            </p>
          </div>
        ) : null}
    </div>
  );
}

export default CommonCastResults;
