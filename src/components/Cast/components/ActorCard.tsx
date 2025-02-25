import React from 'react';
import TMDBService from '@/services/tmdb';
import { Role } from '@/types';

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

const ActorCard: React.FC<ActorCardProps> = (props) => {

  const { actor, isExpanded, onExpand } = props

  return (
    <div
      key={actor.id}
      className="bg-gray-700 rounded-lg overflow-hidden transition-all duration-300"
    >
      {/* 折叠头部 */}
      <div
        onClick={onExpand}
        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-600 transition-colors"
      >
        {/* 演员头像 */}
        <img
          src={TMDBService.getImageUrl(actor.profile_path, 'w92')}
          alt={actor.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* 演员信息 */}
        <div className="flex-1">
          <h3 className="text-lg font-bold">{actor.name}</h3>
          <p className="text-gray-400">
            出现剧集：{actor.showAppearances.length}部
          </p>
          <p className="text-gray-400 text-sm">
            {actor.showAppearances.map(show => show.showName).join('、')}
          </p>
        </div>

        {/* 展开/折叠图标 */}
        <svg
          className={`w-6 h-6 transition-transform ${
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
        <div className="border-t border-gray-600 divide-y divide-gray-600">
          {actor.showAppearances.map(appearance => (
            <div key={appearance.showName} className="p-4">
              <h4 className="font-semibold mb-3">{appearance.showName}</h4>
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
                        {/*{isLoading ? (*/}
                          <div className="w-full h-full bg-gray-800 animate-pulse" />
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
                        <p className="font-medium">{role.character}</p>
                        <p className="text-sm text-gray-400">
                          出演 {role.episode_count} 集
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
  )
}

export default ActorCard