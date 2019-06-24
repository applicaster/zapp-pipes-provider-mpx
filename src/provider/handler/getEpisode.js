import {axios} from '../../axios/axios';
import {config} from '../../config/index';
import {mapEpisode} from './mappers/episodeMapper';
import {types} from '../../types';

export async function getEpisode() {
  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(config.MPX.ENDPOINTS.episode);
    return {
      type: {
        value: types.feed
      },
      entry: items.map(mapEpisode)
    };
  } catch (err) {
    throw err;
  }
}