import {axios} from '../../axios/axios';
import {mapMovies} from './mappers/moviesMapper';
import {types} from '../../types';


export async function getMovies(params) {
  const { url } = params;

  try {
    const {
      data: {
        title,
        entries: items = []
      }
    } = await axios.get(url);

    return {
      type: {
        value: types.feed
      },
      title,
      entry: items.map(mapMovies)
    };
  } catch (err) {
    throw err;
  }
}
