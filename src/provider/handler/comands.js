import {getSeries} from './getSeries';
import {getSeasons} from './getSeasons';
import {getEpisodes} from './getEpisodes';
import {getMovies} from './getMovies';
import {getShow} from './getShow';


export function getCommands() {
  return {
    series: getSeries,
    seasons: getSeasons,
    episodes: getEpisodes,
    movies: getMovies,
    show: getShow,
  };
}
