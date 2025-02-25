// TMDB API 响应的类型定义
export interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}

export interface SearchTVResponse {
  page: number;
  results: TVShow[];
  total_results: number;
  total_pages: number;
}

export interface TMDBError {
  status_message: string;
  status_code: number;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  roles: {
    episode_count: number;
    credit_id: string;
    character: string;
  }[];
  total_episode_count: number;
  popularity: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface AggregateCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
