import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getSeasons(params) {
  let {url} = params;
  url = setRange(url);

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(`${url}`);

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