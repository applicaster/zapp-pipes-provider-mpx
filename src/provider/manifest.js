export const manifest = {
  handlers: ['series', 'seasons', 'episodes', 'movies'],
  help: {
    series: {
      description: 'retrieves the complete list of series',
      params: {
        url: 'required. base64 encoded series feed url',
        limit: 'optional. Limits the number of series in response payload'
      }
    },
    seasons: {
      description: 'retrieves list of seasons according to the url parameters',
      params: {
        url: 'required. base64 encoded seasons feed url',
        limit: 'optional. Limits the number of seasons in response payload'
      }
    },
    episodes: {
      description: 'retrieves list of episodes according to the url parameters',
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
  }
};
