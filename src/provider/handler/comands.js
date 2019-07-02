import {getSeries} from './getSeries';
import {getSeasons} from './getSeasons';
import {getEpisodes} from './getEpisodes';
import {getMovies} from './getMovies';

export const commands = {
  series: getSeries,
  seasons: getSeasons,
  episodes: getEpisodes,
  movies: getMovies
};