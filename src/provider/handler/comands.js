import {getSeries} from './getSeries';
import {getSeasons} from './getSeasons';
import {getEpisode} from './getEpisode';
import {getMovie} from './getMovie';

export const commands = {
  series: getSeries,
  seasons: getSeasons,
  episode: getEpisode,
  movie: getMovie
};