'use client';

import React, { useState, useEffect } from 'react';
import TMDBService from '@/services/tmdb';
import { Role } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import HighlightText from '@/components/Cast/components/HighlightText';

interface ActorCardProps {
  actor: CommonCastResult;
  isExpanded: boolean;
  onExpand: () => void;
  searchTerm: string;
}

interface CommonCastResult {
  id: number;
  name: string;
  profile_path: string | null;
  showAppearances: {
    showName: string;
    showId: number;
    roles: Role[];
  }[];
  totalEpisodes: number;
}

interface RoleImage {
  still_path: string | null;
  error?: boolean;
}



const ActorCard: React.FC<ActorCardProps> = React.memo(props => {
  const { actor, isExpanded, onExpand, searchTerm } = props;
  const t = useTranslations('CommonCastResults');

  // 角色图片状态管理
  const [rolesWithImages, setRolesWithImages] = useState<Map<string, RoleImage>>(new Map());
  const [loadingRoles, setLoadingRoles] = useState<Set<string>>(new Set());

  // 加载角色图片
  const loadRoleImage = (appearance: typeof actor.showAppearances[0], role: Role) => {
    const cacheKey = `${appearance.showId}-${actor.id}-${role.credit_id}`;

    if (rolesWithImages.has(cacheKey) || loadingRoles.has(cacheKey)) return;

    setLoadingRoles(prev => new Set(prev).add(cacheKey));

    try {
      // 这里添加获取角色图片的API调用
      // const response = await fetch(`/api/role-image/${appearance.showId}/${role.credit_id}`);
      // const data = await response.json();

      // 模拟API调用
      // console.log('Fetching role image:', appearance.showId, role.credit_id);
      const mockImage = { still_path: null };

      setRolesWithImages(prev => new Map(prev).set(cacheKey, mockImage));
    } catch (error) {
      setRolesWithImages(prev => new Map(prev).set(cacheKey, { still_path: null, error: true }));
    } finally {
      setLoadingRoles(prev => {
        const newSet = new Set(prev);
        newSet.delete(cacheKey);
        return newSet;
      });
    }
  };

  // 处理图片加载错误
  const handleImageError = (cacheKey: string) => {
    setRolesWithImages(prev => new Map(prev).set(cacheKey, { still_path: null, error: true }));
  };

  return (
    <div
      className="bg-white dark:bg-gray-700
        rounded-lg overflow-hidden
        border border-gray-200 dark:border-gray-600
        transition-all duration-300"
    >
      {/* Collapsed header */}
      <div
        onClick={onExpand}
        className="p-4 flex items-center gap-4 cursor-pointer
          hover:bg-gray-100 dark:hover:bg-gray-600
          transition-colors"
      >
        {/* Actor avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={TMDBService.getImageUrl(actor.profile_path, 'w92')}
            alt={actor.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Actor info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            <HighlightText text={actor.name} searchTerm={searchTerm} />
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t('showInCast', { count: actor.showAppearances.length })}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {actor.showAppearances.map((show, index) => (
              <React.Fragment key={show.showId}>
                {index > 0 && "、"}
                <HighlightText text={show.showName} searchTerm={searchTerm} />
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Expand/collapse icon */}
        <svg
          className={`w-6 h-6 text-gray-400 dark:text-gray-400 transform transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Expanded details - using Grid for smooth transition */}
      <div
        className={`
          grid transition-[grid-template-rows] duration-300 ease-in-out
          ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-200 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
            {actor.showAppearances.map(appearance => (
              <div key={appearance.showName} className="p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  <HighlightText text={appearance.showName} searchTerm={searchTerm} />
                </h4>
                <div className="space-y-3">
                  {appearance.roles.map(role => {
                    const cacheKey = `${appearance.showId}-${actor.id}-${role.credit_id}`;
                    const roleWithImage = rolesWithImages.get(cacheKey);
                    const isLoading = loadingRoles.has(cacheKey);

                    // Load image when expanded
                    // useEffect(() => {
                    //   if (isExpanded) {
                    //     loadRoleImage(appearance, role);
                    //   }
                    // }, [isExpanded, appearance.showId, role.credit_id]);

                    return (
                      <div
                        key={role.credit_id}
                        className="flex items-center gap-4"
                      >
                        {/* Role image or loading state */}
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            <HighlightText text={role.character} searchTerm={searchTerm} />
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('showInEpisode', { count: role.episode_count })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ActorCard.displayName = 'ActorCard';

export default ActorCard;