import {config} from '../../config/index';
import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';

export async function getSeasons() {

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(config.MPX.ENDPOINTS.seasons);

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