import { axios } from '../../axios/axios';
import { mapSeries } from './mappers/seriesMapper';
import { types } from '../../types';


export async function getSeries(params) {
  const { url } = params;

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
      entry: items.map(mapSeries)
    };
  } catch (err) {
    throw err;
  }
}
