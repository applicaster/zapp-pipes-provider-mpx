import {mapSeasons} from './mappers/seasonsMapper';
import {axios} from '../../axios/axios';
import {types} from '../../types';
import { getUniqueItems, setRange } from "../../utils";
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
        entries: items = []
      }
    } = await axios.get(`${url}`);

    if (platform === 'media') {
      config.MPX.CUSTOM_FIELD_NAME = Object.keys(customFieldObject)[0];
      const uniqueItems = getUniqueItems(items, `${config.MPX.CUSTOM_FIELD_NAME}$season`);

      return {
        type: {
          value: types.feed
        },
        entry: uniqueItems.map(mapMediaSeasons)
      };
    }

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