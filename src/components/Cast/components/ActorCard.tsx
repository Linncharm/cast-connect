'use client';

import React, { useState, useEffect } from 'react';
import TMDBService from '@/services/tmdb';
import { Role } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ActorCardProps {
  actor: CommonCastResult;
  isExpanded: boolean;
  onExpand: () => void;
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
  const { actor, isExpanded, onExpand } = props;
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
      console.log('Fetching role image:', appearance.showId, role.credit_id);
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
      {/* 折叠头部 */}
      <div
        onClick={onExpand}
        className="p-4 flex items-center gap-4 cursor-pointer
          hover:bg-gray-100 dark:hover:bg-gray-600
          transition-colors"
      >
        {/* 演员头像 */}
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

        {/* 演员信息 */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-200">
            {actor.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
            {t('showInCast', { count: actor.showAppearances.length })}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
            {actor.showAppearances.map(show => show.showName).join('、')}
          </p>
        </div>

        {/* 展开/折叠图标 */}
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

      {/* 展开的详细信息 - 使用Grid实现平滑过渡 */}
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
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white transition-colors duration-200">
                  {appearance.showName}
                </h4>
                <div className="space-y-3">
                  {appearance.roles.map(role => {
                    const cacheKey = `${appearance.showId}-${actor.id}-${role.credit_id}`;
                    const roleWithImage = rolesWithImages.get(cacheKey);
                    const isLoading = loadingRoles.has(cacheKey);

                    // 当展开时加载图片
                    useEffect(() => {
                      if (isExpanded) {
                        loadRoleImage(appearance, role);
                      }
                    }, [isExpanded, appearance.showId, role.credit_id]);

                    return (
                      <div
                        key={role.credit_id}
                        className="flex items-center gap-4"
                      >
                        {/* 角色图片或加载状态 */}
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          {/*{isLoading ? (*/}
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                          {/*) : roleWithImage?.still_path ? (*/}
                          {/*  <Image*/}
                          {/*    src={TMDBService.getImageUrl(roleWithImage.still_path, 'w92')}*/}
                          {/*    alt={`${role.character} 剧照`}*/}
                          {/*    width={64}*/}
                          {/*    height={64}*/}
                          {/*    className="w-full h-full object-cover"*/}
                          {/*    loading="lazy"*/}
                          {/*    onError={() => handleImageError(cacheKey)}*/}
                          {/*  />*/}
                          {/*) : (*/}
                          {/*  <div className="w-full h-full bg-gray-800 flex items-center justify-center">*/}
                          {/*    <span className="text-gray-600 text-sm">*/}
                          {/*      {roleWithImage?.error ? '加载失败' : '无图片'}*/}
                          {/*    </span>*/}
                          {/*  </div>*/}
                          {/*)}*/}
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white transition-colors duration-200">
                            {role.character}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                            {t('showInEpisode', { count: actor.totalEpisodes })}
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