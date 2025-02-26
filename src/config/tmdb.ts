// TMDB 配置常量
export const TMDB_CONFIG = {
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
} as const;

// 图片尺寸配置
export const IMAGE_SIZES = {
  poster: {
    w92: 'w92',
    w154: 'w154',
    w185: 'w185',
    w342: 'w342',
    w500: 'w500',
    w780: 'w780',
    original: 'original',
  },
} as const;
