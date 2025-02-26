import { useState } from 'react';
import TMDBService from '@/services/tmdb';
import { CommonCastResult, ShowCastInfo, TVShow, AllActors } from '@/types';
import { useLocale } from 'next-intl';

type QueryMode = 'strict' | 'fuzzy';

export function useCastAnalysis() {
  const currentLocale = useLocale();
  const [selectedShows, setSelectedShows] = useState<TVShow[]>([]);
  const [queryMode, setQueryMode] = useState<QueryMode>('strict');
  const [commonCastResults, setCommonCastResults] = useState<
    CommonCastResult[]
  >([]);
  const [expandedActors, setExpandedActors] = useState<Set<number>>(new Set());

  // ... 实现演员分析相关逻辑

  // TODO: 加载角色图片
  const loadRoleImages = (actor: CommonCastResult) => {
    console.log('loadRoleImages', actor.name);
  };

  const handleRemoveShow = (showId: number) => {
    setSelectedShows(selectedShows.filter(show => show.id !== showId));
  };

  const handleAnalysis = async () => {
    try {
      // 获取所有选中剧集的演员信息
      const castInfoPromises: Promise<ShowCastInfo>[] = selectedShows.map(
        async show => {
          const tmdbService = TMDBService.getInstance();
          const credits = await tmdbService.getTVAggregateCredits(
            show.id,
            currentLocale,
          );

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
                episode_count: role.episode_count,
              })),
              total_episode_count: actor.total_episode_count,
              popularity: actor.popularity,
            })),
          };
        },
      );

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

  const findCommonCast = (
    showsCastInfo: ShowCastInfo[],
    mode: QueryMode = 'strict',
  ) => {
    // 收集所有演员
    const allActors = new Map<number, AllActors>();

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
            showAppearances: [
              {
                showName: show.showName,
                roles: actor.roles,
                showId: show.showId,
              },
            ],
            showCount: 1,
            totalEpisodes: actor.total_episode_count,
            popularity: actor.popularity,
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

  const handleActorExpand = async (actorId: number) => {
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
      if (actor) {
        // 为每个角色加载图片
        loadRoleImages(actor);
      }
    }
  };

  const handleQueryModeChange = (mode: QueryMode) => {
    setQueryMode(mode);
  };

  return {
    selectedShows,
    queryMode,
    commonCastResults,
    expandedActors,
    handleRemoveShow,
    handleQueryModeChange,
    handleAnalysis,
    handleActorExpand,
    setSelectedShows,
  };
}
