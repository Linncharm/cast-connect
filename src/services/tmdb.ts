import { TMDB_CONFIG, IMAGE_SIZES } from '@/config/tmdb';
import {
  SearchTVResponse,
  TVShow,
  TMDBError,
  AggregateCredits,
} from '@/types/tmdb';

class TMDBService {
  private static instance: TMDBService;
  private readonly baseURL: string;

  private constructor() {
    this.baseURL = '/api/tmdb';
  }

  public static getInstance(): TMDBService {
    if (!TMDBService.instance) {
      TMDBService.instance = new TMDBService();
    }
    return TMDBService.instance;
  }

  private async fetchAPI<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    try {
      const searchParams = new URLSearchParams({
        endpoint,
        ...params
      });

      const response = await fetch(`${this.baseURL}?${searchParams}`, {
        next: { revalidate: 3600 }
      });

      console.log('response', response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          (data as TMDBError).status_message || 'API request failed'
        );
      }

      return data as T;
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  }

  public async searchTV(
    query: string,
    page: number = 1,
    language: string = 'zh-CN'
  ): Promise<SearchTVResponse> {
    return this.fetchAPI<SearchTVResponse>('/search/tv', {
      query: encodeURIComponent(query),
      include_adult: 'false',
      language,
      page: String(page)
    });
  }

  public async getTVDetails(
    id: number,
    language: string = 'zh-CN'
  ): Promise<TVShow> {
    return this.fetchAPI<TVShow>(`/tv/${id}`, { language });
  }

  public async getTVAggregateCredits(
    id: number,
    language: string = 'zh-CN'
  ): Promise<AggregateCredits> {
    return this.fetchAPI<AggregateCredits>(
      `/tv/${id}/aggregate_credits`,
      { language }
    );
  }

  public static getImageUrl(
    path: string | null,
    size: keyof typeof IMAGE_SIZES.poster = 'w500'
  ): string {
    if (!path) return '/images/no-poster.png';
    return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
  }

  public async getTVSeasonCredits(
    tvId: number,
    seasonNumber: number
  ): Promise<any> {
    return this.fetchAPI(`/tv/${tvId}/season/${seasonNumber}`);
  }

  public async getTVSeasons(tvId: number): Promise<any> {
    return this.fetchAPI(`/tv/${tvId}`);
  }
}

export default TMDBService;