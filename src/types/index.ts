export interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}

export interface SearchHistory {
  id: number;
  name: string;
  timestamp: string;
}

export interface Role {
  credit_id: string;
  character: string;
  episode_count: number;
  still_path?: string | null;
  loading?: boolean;
}

export type QueryMode = 'strict' | 'fuzzy';

export interface CommonCastResult {
  id: number;
  name: string;
  profile_path: string | null;
  showAppearances: ShowAppearance[];
  totalEpisodes: number;
}

export interface ShowAppearance {
  showName: string;
  showId: number;
  roles: Role[];
}

// 定义剧集演员信息接口
export interface ShowCastInfo {
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

export interface AllActors {
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
}
