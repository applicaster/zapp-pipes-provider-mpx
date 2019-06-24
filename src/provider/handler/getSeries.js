import {axios} from '../../axios/axios';
import {config} from '../../config/index';
import {mapSeries} from './mappers/seriesMapper';
import {types} from '../../types';

export async function getSeries() {

  try {
    debugger;
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(config.MPX.ENDPOINTS.series);
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