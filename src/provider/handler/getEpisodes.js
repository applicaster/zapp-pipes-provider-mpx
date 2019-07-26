import {axios} from '../../axios/axios';
import {mapEpisodes} from './mappers/episodesMapper';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getEpisodes(params) {
  const feedUrl = setRange(params);

  try {
    const  {
      data: {
        entries: items = []
      }
    } = await axios.get(`${feedUrl}`);

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