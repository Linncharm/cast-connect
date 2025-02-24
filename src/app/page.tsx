'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import TMDBService from '@/services/tmdb';
import '@/styles/scrollbar.css';
import '@/styles/global.css';
import { off } from 'next/dist/client/components/react-dev-overlay/pages/bus';
import { Cast } from '@/types/tmdb';

interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}


interface SearchHistory {
  id: number;
  name: string;
  timestamp: string;
}

// 定义演员角色接口
interface Role {
  credit_id: string;
  character: string;
  episode_count: number;
  still_path?: string | null;
  loading?: boolean;
}

// 定义演员信息接口
interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  roles: Role[];
  total_episode_count: number;
  order: number;
}

// 定义剧集演员信息接口
interface ShowCastInfo {
  showId: number;
  showName: string;
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    roles: Role[];
    total_episode_count: number;
    popularity: number;
  }>;
}

interface ShowAppearance {
  showName: string;
  showId: number; // 添加 showId
  roles: Role[];
}

// 首先添加查询模式的类型和状态
type QueryMode = 'strict' | 'fuzzy';


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShows, setSelectedShows] = useState<TVShow[]>([]);
  const [searchResults, setSearchResults] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);

// 在组件顶部添加状态
  const [queryMode, setQueryMode] = useState<QueryMode>('strict');

  // 在组件顶部添加新的状态
  const [commonCastResults, setCommonCastResults] = useState<{
    id: number;
    name: string;
    profile_path: string | null;
    showAppearances: {
      showName: string;
      showId: number; // 添加 showId
      roles: Role[];
    }[];
    totalEpisodes: number;
  }[]>([]);

// 在组件中添加展开状态管理
  const [expandedActors, setExpandedActors] = useState<Set<number>>(new Set());
  // 在组件中添加状态来跟踪图片加载
  const [loadingRoles, setLoadingRoles] = useState<Set<string>>(new Set());
  const [rolesWithImages, setRolesWithImages] = useState<Map<string, Role>>(new Map());

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Search TMDB API
  const searchTMDB = useCallback(async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const tmdbService = TMDBService.getInstance();
      const response = await tmdbService.searchTV(query, 1, 'en-US');
      setSearchResults(response.results.slice(0, 6)); // 只显示前6个结果
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Watch for debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchTMDB(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, searchTMDB]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // 修改 addShow 函数以添加历史记录
  const addShow = (show: TVShow) => {
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

  const removeShow = (showId: number) => {
    setSelectedShows(selectedShows.filter(show => show.id !== showId));
  };

  // 添加加载角色图片的函数
  const loadRoleImages = async (actor: any) => {

    // TODO 目前有5层for循环，优化
    // 1. 获取剧集的详细信息：/tv/{tv_id}  ---> actor.showAppearance.showId
    // 2. 获取Season的详细信息：/tv/{tv_id}/season/{season_number}
    // 3. 获取Episode的详细信息：/tv/{tv_id}/season/{season_number}/episode/{episode_number}

    const tmdbService = TMDBService.getInstance();

    // 为每个剧集的每个角色加载图片---------1. 遍历演员出演剧集
    for (const appearance of actor.showAppearances) {
      // 获取剧集信息
      const tvInfo = await tmdbService.getTVSeasons(appearance.showId);
      const seasons = tvInfo.seasons || [];
      //------------------------------2. 遍历剧集的每个角色（如果有多个）
      for (const role of appearance.roles) {
        const roleId = role.credit_id
        const cacheKey = `${appearance.showId}-${actor.id}-${role.credit_id}`;

        // 如果已经加载过或正在加载，跳过
        if (rolesWithImages.has(cacheKey) || loadingRoles.has(cacheKey)) {
          continue;
        }

        // 标记为加载中
        setLoadingRoles(prev => new Set(prev).add(cacheKey));

        try {
          // ------------------------3. 遍历Season寻找角色图片
          for (const season of seasons) {
            const credits = await tmdbService.getTVSeasonCredits(
              appearance.showId,
              season.season_number
            );
            console.log({credits})
            // ----------------------4. 遍历单独Season中的每一集
            for(const episode of credits.episodes) {
              // --------------------5. 单独遍历每一集中的每个角色
              for(const guest_star of episode.guest_stars) {
                if(guest_star.credit_id === roleId) {
                  const castMember = guest_star;
                  console.log({castMember})
                  // 有误!!!! profile_path实际上是演员照片
                  if (castMember?.profile_path) {
                    // 保存找到的图片
                    setRolesWithImages(prev => new Map(prev).set(cacheKey, {
                      ...role,
                      still_path: castMember.profile_path
                    }));
                    break; // 找到图片后跳出循环
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error('Error loading character image:', error);
        } finally {
          // 移除加载状态
          setLoadingRoles(prev => {
            const next = new Set(prev);
            next.delete(cacheKey);
            return next;
          });
        }
      }
    }
  };

  const getImageUrl = (path: string | null, size: string = 'w92') => {
    if (!path) return '/images/no-poster.png'; // 需要添加一个默认的海报图片
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const handleAnalysis = async () => {
    try {
      // 获取所有选中剧集的演员信息
      const castInfoPromises: Promise<ShowCastInfo>[] = selectedShows.map(async show => {
        const tmdbService = TMDBService.getInstance();
        const credits = await tmdbService.getTVAggregateCredits(show.id, 'en-US');

        return {
          showId: show.id,
          showName: show.name,
          cast: credits.cast.map(actor => ({
            id: actor.id,
            name: actor.name,
            profile_path: actor.profile_path,
            roles: actor.roles.map(role => ({
              credit_id: role.credit_id,
              character: role.character,
              episode_count: role.episode_count
            })),
            total_episode_count: actor.total_episode_count,
            popularity: actor.popularity
          })),
        };
      });

      const showsCastInfo = await Promise.all(castInfoPromises);

      // 找出共同演员
      const commonCast = findCommonCast(showsCastInfo, queryMode);
      console.log('Common cast:', commonCast);

      // 按出演集数总和排序,在集数相等的情况下按人气排序
      commonCast.sort((a, b) => {
        if (a.showCount === b.showCount) {
          return b.popularity - a.popularity;
        }
        return b.showCount - a.showCount;
      });

      setCommonCastResults(commonCast); // 保存结果到状态

    } catch (error) {
      console.error('Analysis error:', error);
    }
  };

// 修改 findCommonCast 函数以支持两种查询模式
  const findCommonCast = (showsCastInfo: ShowCastInfo[], mode: QueryMode = 'strict') => {
    // 收集所有演员
    const allActors = new Map<number, {
      id: number;
      name: string;
      profile_path: string | null;
      showAppearances: {
        showName: string;
        roles: Role[];
        showId: number; // 添加 showId
      }[];
      showCount: number;
      totalEpisodes: number;
      popularity: number;
    }>();

    // 遍历所有剧集，收集演员信息
    showsCastInfo.forEach(show => {
      show.cast.forEach(actor => {
        const existingActor = allActors.get(actor.id);
        if (existingActor) {
          // 更新现有演员信息
          existingActor.showAppearances.push({
            showName: show.showName,
            roles: actor.roles,
            showId: show.showId,
          });
          existingActor.showCount += 1;
          existingActor.popularity += actor.popularity;
          existingActor.totalEpisodes += actor.total_episode_count;
        } else {
          // 添加新演员
          allActors.set(actor.id, {
            id: actor.id,
            name: actor.name,
            profile_path: actor.profile_path,
            showAppearances: [{
              showName: show.showName,
              roles: actor.roles,
              showId:show.showId
            }],
            showCount: 1,
            totalEpisodes: actor.total_episode_count,
            popularity:actor.popularity
          });
        }
      });
    });

    // 根据查询模式筛选演员
    const filteredActors = Array.from(allActors.values()).filter(actor => {
      if (mode === 'strict') {
        // 严格模式：演员必须出现在所有剧集中
        return actor.showCount === showsCastInfo.length;
      } else {
        // 模糊模式：演员必须出现在至少两个剧集中
        return actor.showCount >= 2;
      }
    });

    return filteredActors;
  };

  // 添加处理折叠/展开的函数
  // 修改展开/折叠处理函数
  const toggleActorExpand = async (actorId: number) => {
    const isExpanding = !expandedActors.has(actorId);

    // 先展开再加载
    setExpandedActors(prev => {
      const next = new Set(prev);
      if (next.has(actorId)) {
        next.delete(actorId);
      } else {
        next.add(actorId);
      }
      return next;
    });

    if (isExpanding) {
      // 找到对应的演员
      const actor = commonCastResults.find(a => a.id === actorId);
      console.log({actor})
      if (actor) {
        // 为每个角色加载图片
        await loadRoleImages(actor);
      }
    }

  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('tvSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="py-8 px-8" aria-label="电视剧搜索区域">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 标题部分 */}
          <header className="text-center">
            <h1 className="text-4xl font-bold mb-2">CastConnect</h1>
            <p className="text-xl text-gray-300">发现演员的影视纽带</p>
          </header>

          {/* 搜索和操作区域 */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <label htmlFor="show-search" className="sr-only">搜索电视剧</label>
              <SearchIcon aria-hidden="true" className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="show-search"
                type="search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="搜索电视剧..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                aria-label="搜索电视剧"
                onFocus={() => setShowHistory(true)}
                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                autoComplete={'off'}
              />

              {/* 搜索历史记录 */}
              {showHistory && !searchTerm && searchHistory.length > 0 && (
                <div
                  className="absolute w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden custom-scrollbar">
                  <div className="p-2 border-b border-gray-700">
                    <span className="text-sm text-gray-400">最近搜索</span>
                  </div>
                  {searchHistory.map((item) => (
                    <div
                      key={`${item.id}-${item.timestamp}`}
                      onClick={() => handleSearch(item.name)}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 group"
                    >
                      <div className="flex-1">
                        <span className="text-sm text-gray-200">{item.name}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newHistory = searchHistory.filter(
                            h => h.id !== item.id,
                          );
                          setSearchHistory(newHistory);
                          localStorage.setItem('tvSearchHistory', JSON.stringify(newHistory));
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-200 transition-opacity"
                        aria-label="删除历史记录"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 搜索结果下拉框 */}
              {showHistory && (searchResults.length > 0 || isLoading) && (
                <div
                  className="absolute w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="relative">
                    {isLoading && (
                      <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="text-gray-400 text-sm py-4">搜索中...</div>
                      </div>
                    )}

                    {searchResults.map((show, index) => (
                      <div
                        key={show.id}
                        onClick={() => addShow(show)}
                        className="p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {index < 3 && (
                            <img
                              src={TMDBService.getImageUrl(show.poster_path, 'w92')}
                              alt={`${show.name}的海报`}
                              className="w-12 h-16 rounded object-cover flex-shrink-0"
                              loading="lazy"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">{show.name}</div>
                            <div className="text-sm text-gray-400">
                              {show.first_air_date?.split('-')[0] || '未知年份'}
                            </div>
                            {show.overview && (
                              <p
                                className="text-sm text-gray-400 line-clamp-1 mt-1 cursor-help"
                                title={show.overview} // 添加 title 属性显示完整文字
                              >
                                {show.overview}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <select
                value={queryMode}
                onChange={(e) => setQueryMode(e.target.value as QueryMode)}
                className="appearance-none bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 pr-8 focus:outline-none focus:border-blue-500 transition-colors"
                aria-label="查询模式"
              >
                <option value="strict">严格查询</option>
                <option value="fuzzy">模糊查询</option>
              </select>
              {/* 自定义下拉箭头 */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleAnalysis}
              disabled={selectedShows.length < 2}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
              aria-label={`查询关系${selectedShows.length < 2 ? '（需要至少选择两部剧集）' : ''}`}
            >
              查询关系
            </button>
          </div>

          {/* 已选剧集容器 */}
          <div className="bg-gray-800 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {selectedShows.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                请搜索并选择剧集以开始分析
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedShows.map(show => (
                  <div
                    key={show.id}
                    className="bg-gray-700 rounded-lg p-3 relative group"
                  >
                    <button
                      onClick={() => removeShow(show.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`移除 ${show.name}`}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(show.poster_path)}
                        alt={`${show.name}的海报`}
                        className="w-12 h-16 rounded object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-medium">{show.name}</div>
                        <div className="text-sm text-gray-400">
                          {show.first_air_date?.split('-')[0] || '未知年份'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 已选剧集容器下方添加 */}
          {commonCastResults.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">共同演员</h2>
              <div className="space-y-4">
                {commonCastResults.map(actor => (
                  <div
                    key={actor.id}
                    className="bg-gray-700 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    {/* 折叠头部 */}
                    <div
                      onClick={() => toggleActorExpand(actor.id)}
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
                          expandedActors.has(actor.id) ? 'transform rotate-180' : ''
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
                    {expandedActors.has(actor.id) && (
                      <div className="border-t border-gray-600 divide-y divide-gray-600">
                        {actor.showAppearances.map(appearance => (
                          <div key={appearance.showName} className="p-4">
                            <h4 className="font-semibold mb-3">{appearance.showName}</h4>
                            <div className="space-y-3">
                              {appearance.roles.map(role => {
                                const cacheKey = `${appearance.showId}-${actor.id}-${role.credit_id}`;
                                const roleWithImage = rolesWithImages.get(cacheKey);
                                const isLoading = loadingRoles.has(cacheKey);

                                return (
                                  <div
                                    key={role.credit_id}
                                    className="flex items-center gap-4"
                                  >
                                    {/* 角色图片或加载状态 */}
                                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                      {isLoading ? (
                                        // 加载中状态
                                        <div className="w-full h-full bg-gray-800 animate-pulse" />
                                      ) : roleWithImage?.still_path ? (
                                        // 显示图片
                                        <img
                                          src={TMDBService.getImageUrl(roleWithImage.still_path, 'w92')}
                                          alt={`${role.character} 剧照`}
                                          className="w-full h-full object-cover"
                                          loading="lazy"
                                        />
                                      ) : (
                                        // 无图片占位
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                          <span className="text-gray-600 text-sm">无图片</span>
                                        </div>
                                      )}
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
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
          .line-clamp-1 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
          }

          /* 添加平滑过渡效果 */
          .absolute {
              transition: opacity 0.2s ease-in-out;
          }
      `}</style>
    </main>
  );
}