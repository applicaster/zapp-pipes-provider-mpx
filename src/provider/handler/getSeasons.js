import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';

export async function getSeasons(params) {
  const {
    url = ''
  } = params;

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
      entry: items.map(mapSeasons)
    };
  } catch (err) {
    throw err;
  }
}