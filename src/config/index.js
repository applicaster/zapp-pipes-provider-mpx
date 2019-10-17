export const config = {
  PROVIDER: {
    name: 'mpx-test'
  },
  MPX: {
    API_BASE_URL: '',
    URL: '',
    MEDIA_BASE_HOST: 'feed.media.theplatform.com',
    ENTERTAINMENT_BASE_HOST: 'feed.entertainment.tv.theplatform.com',
    ENDPOINTS: {
      series: 'aplcstr30-series',
      seasons: 'aplcstr30-tv-seasons',
      episodes: 'aplcstr30-episodes',
      movies: 'aplcstr30-movies'
    },
    CUSTOM_FIELD_NAME: '',
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
  },
  IMAGES: undefined
};