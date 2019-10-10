import { mapSeasons } from './mappers/seasonsMapper';
import { axios } from '../../axios/axios';
import { types } from '../../types';
import { byField, getUniqueItems, setRange } from "../../utils";
import { mapMediaSeasons } from "./mappers/mediaSeasonsMapper";

export async function getSeasons(params) {
  let { url } = params;
  const { platform } = params;

  url = setRange(url);

  try {
    const {
      data: {
        $xmlns: customFieldObject = {},
        entries: items = []
      }
    } = await axios.get(url);

    const { seriesTitle: title } = items[0];

    if (platform === 'media') {

      let uniqueItems = getUniqueItems(items, customFieldObject, 'season');
      uniqueItems = uniqueItems.sort(byField('season'));

      return {
        type: {
          value: types.feed
        },
        title,
        entry: uniqueItems.map(mapMediaSeasons)
      };
    }

    return {
      type: {
        value: types.feed
      },
      title,
      entry: items.map(mapSeasons)
    };
  } catch (err) {
    throw err;
  }
}