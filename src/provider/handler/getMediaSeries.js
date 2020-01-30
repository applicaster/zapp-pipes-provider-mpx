import { axios } from '../../axios/axios';
import { types } from '../../types';
import { getUniqueItems } from "../../utils";
import { mapMediaSeries } from "./mappers/mediaSeriesMapper";

export async function getMediaSeries(params) {
  const { url, mediaBaseUrl } = params;

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
      entry: uniqueItems.map((item) => mapMediaSeries(item, mediaBaseUrl))
    };

  } catch (err) {
    throw err;
  }
}
