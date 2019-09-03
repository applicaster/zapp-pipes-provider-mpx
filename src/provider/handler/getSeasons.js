import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';
import { byField, getUniqueItems, setRange, getShowTitle } from "../../utils";
import { mapMediaSeasons } from "./mappers/mediaSeasonsMapper";
import { config } from "../../config";

export async function getSeasons(params) {
  let {
    url,
    platform
  } = params;
  url = setRange(url);

  try {
    const {
      data: {
        $xmlns: customFieldObject = {},
        title,
        entries: items = []
      }
    } = await axios.get(`${url}`);

    if (platform === 'media') {
      config.MPX.CUSTOM_FIELD_NAME = Object.keys(customFieldObject)[0];
      let uniqueItems = getUniqueItems(items, `${config.MPX.CUSTOM_FIELD_NAME}$season`);
      uniqueItems = uniqueItems.sort(byField(`${config.MPX.CUSTOM_FIELD_NAME}$season`));

      return {
        type: {
          value: types.feed
        },
        title: getShowTitle(items),
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