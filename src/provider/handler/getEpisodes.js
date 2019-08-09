import {axios} from '../../axios/axios';
import {mapEpisodes} from './mappers/episodesMapper';
import {mapMediaEpisodes} from './mappers/mediaEpisodesMapper';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getEpisodes(params) {
  let {
    url,
    platform
  } = params;
  url = setRange(url);

  try {
    const  {
      data: {
        entries: items = []
      }
    } = await axios.get(`${url}`);

    if (platform === 'media') {
      return {
        type: {
          value: types.feed
        },
        entry: items.map(mapMediaEpisodes)
      };
    }

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