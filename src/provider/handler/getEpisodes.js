import {axios} from '../../axios/axios';
import {mapEpisodes} from './mappers/episodesMapper';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getEpisodes(params) {
  let {url} = params;
  url = setRange(url);

  try {
    const  {
      data: {
        entries: items = []
      }
    } = await axios.get(`${url}`);

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