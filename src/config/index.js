export const config = {
  PROVIDER: {
    name: 'mpx'
  },
  MPX: {
    API_BASE_URL: '',
    ENDPOINTS: {
      series: 'aplcstr30-series',
      seasons: 'aplcstr30-tv-seasons',
      episodes: 'aplcstr30-episodes',
      movies: 'aplcstr30-movies'
    },
    SORT_BY: {
      seasons: 'tvSeasonNumber'
    }
  },
  IMAGE: {
    baseMinWidth: 700,
    baseMinHeight: 400,
    baseMaxWidth: 800,
    baseMaxHeight: 500,
    baseKey: 'image_base'
  }
};