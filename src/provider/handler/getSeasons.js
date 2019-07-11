import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getSeasons(params) {
  const { url } = params;

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(`${url}${setRange(params)}`);

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