import {axios} from '../../axios/axios';
import {mapEpisode} from './mappers/episodeMapper';
import {types} from '../../types';

export async function getEpisode(params) {
  const {url} = params;

  try {
    const  {
      data: {
        entries: items
      }
    }  = await axios.get(url);

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