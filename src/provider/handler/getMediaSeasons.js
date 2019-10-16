import { axios } from '../../axios/axios';
import { types } from '../../types';
import { byField, getUniqueItems, setRange } from "../../utils";
import { mapMediaSeasons } from "./mappers/mediaSeasonsMapper";

export async function getMediaSeasons(params) {
  let { url } = params;
  url = setRange(url);

  try {
    const {
      data: {
        $xmlns: customFieldObject = {},
        entries: items = []
      }
    } = await axios.get(url);

      let uniqueItems = getUniqueItems(items, customFieldObject, 'season');
      uniqueItems = uniqueItems.sort(byField('season'));

      return {
        type: {
          value: types.feed
        },
        entry: uniqueItems.map(mapMediaSeasons)
      };

  } catch (err) {
    throw err;
  }
}