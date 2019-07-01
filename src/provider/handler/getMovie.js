import {axios} from '../../axios/axios';
import {mapMovie} from './mappers/movieMapper';
import {types} from '../../types';

export async function getMovie(params) {
  const {url} = params;

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(url);
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