import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';

export async function getSeasons(params) {
  const {
    url = '',
    bySeriesId: seriesId
  } = params;

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(url);

    return {
      type: {
        value: types.feed
      },
      entry: items.map((item) => mapSeasons({...item, seriesId}))
    };
  } catch (err) {
    throw err;
  }
}