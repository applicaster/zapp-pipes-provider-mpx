import { axios } from '../../axios/axios';
import { mapSeries } from './mappers/seriesMapper';
import { types } from '../../types';
import { setRange } from "../../utils";

export async function getSeries(params) {
  let { url } = params;

  const { entertainmentBaseUrl } = params;
  url = setRange(url);

  try {
    const {
      data: {
        title,
        entries: items = []
      }
    } = await axios.get(url);

    return {
      type: {
        value: types.feed
      },
      title,
      entry: items.map((item) => mapSeries(item, entertainmentBaseUrl))
    };
  } catch (err) {
    throw err;
  }
}