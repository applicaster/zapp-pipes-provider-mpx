import { axios } from '../../axios/axios';
import { mapSeries } from './mappers/seriesMapper';
import { types } from '../../types';
import { setRange, getUniqueItems } from "../../utils";
import { mapMediaSeries } from "./mappers/mediaSeriesMapper";

export async function getSeries(params) {
  let { url } = params;

  const { platform } = params;
  url = setRange(url);

  try {
    const {
      data: {
        $xmlns: customFieldObject = {},
        title,
        entries: items = []
      }
    } = await axios.get(url);

    if (platform === 'media') {

      const uniqueItems = getUniqueItems(items, customFieldObject, 'showTitle');

      return {
        type: {
          value: types.feed
        },
        title,
        entry: uniqueItems.map(mapMediaSeries)
      };
    }

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