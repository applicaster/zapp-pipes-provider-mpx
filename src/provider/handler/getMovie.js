import {axios} from '../../axios/axios';
import {config} from '../../config/index';
import {mapMovie} from './mappers/movieMapper';
import {types} from '../../types';

export async function getMovie() {

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(config.MPX.ENDPOINTS.movie);
    return {
      type: {
        value: types.feed
      },
      entry: items.map(mapMovie)
    };
  } catch (err) {
    throw err;
  }
}