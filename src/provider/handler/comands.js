import { getSeries } from './getSeries';
import { getShow } from './getShow';
import { getEpisodes } from './getEpisodes';
import { getMovies } from './getMovies';
import { getSeasons } from './getSeasons';
import { getMediaEpisodes } from './getMediaEpisodes';
import { getSeason } from './getSeason';
import { getPlatform } from '../../middleware/utils';

export function getCommands(params) {
  const { url } = params;
  const platform = getPlatform(url);

  return {
    series: getSeries,
    show: getShow,
    episodes: platform !== 'media' ? getEpisodes : getMediaEpisodes,
    movies: getMovies,
    seasons: getSeasons,
    season: getSeason
  };
}
