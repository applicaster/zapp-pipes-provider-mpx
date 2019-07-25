import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getSeasons(params) {
  const feedUrl = setRange(params);

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(`${feedUrl}`);

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