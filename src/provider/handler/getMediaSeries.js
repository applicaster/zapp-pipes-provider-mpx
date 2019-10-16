import { axios } from '../../axios/axios';
import { types } from '../../types';
import { setRange, getUniqueItems } from "../../utils";
import { mapMediaSeries } from "./mappers/mediaSeriesMapper";

export async function getMediaSeries(params) {
  let { url } = params;
  url = setRange(url);

  try {
    const {
      data: {
        $xmlns: customFieldObject = {},
        title,
        entries: items = []
      }
    } = await axios.get(url);

    const uniqueItems = getUniqueItems(items, customFieldObject, 'showTitle');

    return {
      type: {
        value: types.feed
      },
      title,
      entry: uniqueItems.map((item) => mapMediaSeries(item, url))
    };

  } catch (err) {
    throw err;
  }
}