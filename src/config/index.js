export const config = {
  PROVIDER: {
    name: 'mpx-test'
  },
  MPX: {
    API_BASE_URL: '',
    MEDIA_BASE_URL: 'http://feed.media.theplatform.com',
    ENTERTAINMENT_BASE_URL: 'http://feed.entertainment.tv.theplatform.com',
    ENDPOINTS: {
      series: 'aplcstr30-series',
      seasons: 'aplcstr30-tv-seasons',
      episodes: 'aplcstr30-episodes',
      movies: 'aplcstr30-movies'
    },
    SORT_BY: {
      seasons: 'tvSeasonNumber'
    },
    LIMIT: 100
  },
  IMAGE: {
    baseMinWidth: 700,
    baseMinHeight: 400,
    baseMaxWidth: 800,
    baseMaxHeight: 500,
    baseKey: 'image_base'
  }
};