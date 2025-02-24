// TMDB 配置常量
export const TMDB_CONFIG = {
  API_BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDc5ODg4ODE4OWQ2YzRkZmNiMjJhYmVlNDNiYzk0MyIsIm5iZiI6MTc0MDM2Mzk1Mi4yODEsInN1YiI6IjY3YmJkOGIwYmQ0OGU4OTI0Y2JlZTFhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KeGjZHHtrR8GgSM7lUJU6Bn0Ety1jjMzqVD1KeCfmVI',
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