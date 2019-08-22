import {axios} from '../../axios/axios';
import {mapSeries} from './mappers/seriesMapper';
import {types} from '../../types';
import { setRange, getUniqueItems } from "../../utils";
import { mapMediaSeries } from "./mappers/mediaSeriesMapper";
import {config} from "../../config";

export async function getSeries(params) {
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
      const uniqueItems = getUniqueItems(items, `${config.MPX.CUSTOM_FIELD_NAME}$showTitle`);

      return {
        type: {
          value: types.feed
        },
        entry: uniqueItems.map(mapMediaSeries)
      };
    }

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