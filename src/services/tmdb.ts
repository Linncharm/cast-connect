import { TMDB_CONFIG, IMAGE_SIZES } from '@/config/tmdb';
import { SearchTVResponse, TVShow, TMDBError, AggregateCredits } from '@/types/tmdb';

class TMDBService {
  private static instance: TMDBService;
  private readonly baseURL: string;
  private readonly headers: HeadersInit;

  private constructor() {
    this.baseURL = TMDB_CONFIG.API_BASE_URL;
    this.headers = {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_CONFIG.API_KEY}`,
    };
  }

  public static getInstance(): TMDBService {
    if (!TMDBService.instance) {
      TMDBService.instance = new TMDBService();
    }
    return TMDBService.instance;
  }

  private async fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: { ...this.headers, ...options.headers },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as TMDBError).status_message || 'API request failed');
      }

      return data as T;
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  }

  /**
   * 搜索电视节目
   * @param query 搜索关键词
   * @param page 页码
   * @param language 语言代码
   */
  public async searchTV(query: string, page: number = 1, language: string = 'zh-CN'): Promise<SearchTVResponse> {
    const endpoint = `/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=${language}&page=${page}`;
    return this.fetchAPI<SearchTVResponse>(endpoint);
  }

  /**
   * 获取电视节目详情
   * @param id TMDB 电视节目 ID
   * @param language 语言代码
   */
  public async getTVDetails(id: number, language: string = 'zh-CN'): Promise<TVShow> {
    const endpoint = `/tv/${id}?language=${language}`;
    return this.fetchAPI<TVShow>(endpoint);
  }

  /**
   * 获取电视节目的演职人员信息
   * @param id TMDB 电视节目 ID
   * @param language 语言代码
   */
  public async getTVAggregateCredits(id: number, language: string = 'zh-CN'): Promise<AggregateCredits> {
    const endpoint = `/tv/${id}/aggregate_credits?language=${language}`;
    return this.fetchAPI<AggregateCredits>(endpoint);
  }

  /**
   * 生成图片URL
   * @param path 图片路径
   * @param size 图片尺寸
   */
  public static getImageUrl(path: string | null, size: keyof typeof IMAGE_SIZES.poster = 'w500'): string {
    if (!path) return '/images/no-poster.png'; // 你需要添加一个默认的海报图片
    return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
  }

  public async getTVSeasonCredits(tvId: number, seasonNumber: number): Promise<any> {
    const endpoint = `/tv/${tvId}/season/${seasonNumber}`;
    return this.fetchAPI(endpoint);
  }

  // 获取剧集的所有季节信息
  public async getTVSeasons(tvId: number): Promise<any> {
    const endpoint = `/tv/${tvId}`;
    return this.fetchAPI(endpoint);
  }


  // 可以继续添加其他 TMDB API 方法...
}

export default TMDBService;