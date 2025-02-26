import React from 'react';
import TMDBService from '@/services/tmdb';
import { Role } from '@/types';
import { useTranslations } from 'next-intl';

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
    showId: number; // 添加 showId
    roles: Role[];
  }[];
  totalEpisodes: number;
}

const ActorCard: React.FC<ActorCardProps> = props => {
  const { actor, isExpanded, onExpand } = props;
  const t = useTranslations('CommonCastResults');

  return (
    <div
      key={actor.id}
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
        <img
          src={TMDBService.getImageUrl(actor.profile_path, 'w92')}
          alt={actor.name}
          className="w-16 h-16 rounded-full object-cover"
        />

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
          className={`w-6 h-6 text-gray-400 dark:text-gray-400 transition-transform ${
            isExpanded ? 'transform rotate-180' : ''
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

      {/* 展开的详细信息 */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
          {actor.showAppearances.map(appearance => (
            <div key={appearance.showName} className="p-4">
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-white transition-colors duration-200">
                {appearance.showName}
              </h4>
              <div className="space-y-3">
                {appearance.roles.map(role => {
                  const cacheKey = `${appearance.showId}-${actor.id}-${role.credit_id}`;
                  // const roleWithImage = rolesWithImages.get(cacheKey);
                  // const isLoading = loadingRoles.has(cacheKey);

                  return (
                    <div
                      key={role.credit_id}
                      className="flex items-center gap-4"
                    >
                      {/* 角色图片或加载状态 */}
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                        {/*{isLoading ? (*/}
                        {/*) : roleWithImage?.still_path ? (*/}
                        {/*  // 显示图片*/}
                        {/*  <img*/}
                        {/*    src={TMDBService.getImageUrl(roleWithImage.still_path, 'w92')}*/}
                        {/*    alt={`${role.character} 剧照`}*/}
                        {/*    className="w-full h-full object-cover"*/}
                        {/*    loading="lazy"*/}
                        {/*  />*/}
                        {/*) : (*/}
                        {/*  // 无图片占位*/}
                        {/*  <div className="w-full h-full bg-gray-800 flex items-center justify-center">*/}
                        {/*    <span className="text-gray-600 text-sm">无图片</span>*/}
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
      )}
    </div>
  );
};

export default ActorCard;
