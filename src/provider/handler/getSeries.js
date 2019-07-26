import {axios} from '../../axios/axios';
import {mapSeries} from './mappers/seriesMapper';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getSeries(params) {
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
      entry: items.map(mapSeries)
    };
  } catch (err) {
    throw err;
  }
}