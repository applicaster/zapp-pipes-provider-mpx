import {axios} from '../../axios/axios';
import {mapEpisodes} from './mappers/episodesMapper';
import {types} from '../../types';

export async function getEpisodes(params) {
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
      entry: items.map(mapEpisodes)
    };
  } catch (err) {
    throw err;
  }
}