import {axios} from '../../axios/axios';
import {config} from '../../config/index';
import {mapEpisode} from './mappers/episodeMapper';
import {types} from '../../types';

export async function getEpisode(id) {

  try {
    const { data } = await axios.get(`${config.MPX.API_BASE_URL}/${id}`);
    if(id) {
      return mapEpisode(data);
    }
    const {
      entries: items
    } = data;
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