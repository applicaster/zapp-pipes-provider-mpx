import { getSeries } from './getSeries';
import { getShow } from './getShow';
import { getEpisodes } from './getEpisodes';
import { getMovies } from './getMovies';
import { getSeasons } from './getSeasons';
import { getMediaShow } from './getMediaShow';
import { getMediaEpisodes } from './getMediaEpisodes';
import { getMediaSeasons } from './getMediaSeasons';
import { getMediaSeries } from './getMediaSeries';
import { getSeason } from './getSeason';
import { getPlatform } from '../../middleware/utils';

export function getCommands(params) {
  const { url } = params;
  const platform = getPlatform(url);

  return {
    series: platform !== 'media' ? getSeries : getMediaSeries,
    show: platform !== 'media' ? getShow : getMediaSeasons,
    episodes: platform !== 'media' ? getEpisodes : getMediaEpisodes,
    movies: getMovies,
    seasons: platform !== 'media' ? getSeasons : getMediaShow,
    season: platform !== 'media' ? getSeason : ''
  };
}
