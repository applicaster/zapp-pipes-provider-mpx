import { getSeries } from './getSeries';
import { getSeasons } from './getSeasons';
import { getEpisodes } from './getEpisodes';
import { getMovies } from './getMovies';
import { getShow } from './getShow';
import { getMediaShow } from './getMediaShow';
import { getMediaEpisodes } from './getMediaEpisodes';
import { getMediaSeasons } from './getMediaSeasons';
import { getMediaSeries } from './getMediaSeries';
import { getPlatform } from '../../middleware/utils';

export function getCommands(params) {
  const { url } = params;
  const platform = getPlatform(url);

  return {
    series: platform !== 'media' ? getSeries : getMediaSeries,
    seasons: platform !== 'media' ? getSeasons : getMediaSeasons,
    episodes: platform !== 'media' ? getEpisodes : getMediaEpisodes,
    movies: getMovies,
    show: platform !== 'media' ? getShow : getMediaShow
  };
}
