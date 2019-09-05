export const manifest = {
  handlers: ['series', 'seasons', 'episodes', 'movies', 'show'],
  help: {
    series: {
      description: 'retrieves the complete list of series',
      params: {
        url: 'required. base64 encoded series feed url',
        limit: 'optional. Limits the number of series in response payload'
      }
    },
    seasons: {
      description: 'retrieves the list of seasons according to the url parameters (e.g. bySeriesId)',
      params: {
        url: 'required. base64 encoded seasons feed url',
        limit: 'optional. Limits the number of seasons in response payload'
      }
    },
    episodes: {
      description: 'retrieves the list of episodes according to the url parameters (e.g. bySeriesId, byTvSeasonId)',
      params: {
        url: 'required. base64 encoded episodes feed url',
        limit: 'optional. Limits the number of episodes in response payload'
      }
    },
    movies: {
      description: 'retrieves the complete list of movies',
      params: {
        url: 'required. base64 encoded movies feed url',
        limit: 'optional. Limits the number of movies in response payload'
      }
    },
    show: {
      description: 'retrieves the list of seasons with metadata of series',
      params: {
        url: 'required. base64 encoded series feed url',
        limit: 'optional. Limits the number of movies in response payload'
      }
    }
  }
};
