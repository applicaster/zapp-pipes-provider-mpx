import { axios } from '../../axios/axios';
import { mapMediaEpisodes } from './mappers/mediaEpisodesMapper';
import { types } from '../../types';
import { byField, setRange } from "../../utils";
import { config } from "../../config";

export async function getMediaEpisodes(params) {
  let { url } = params;
  url = setRange(url);

  try {
    const  {
      data: {
        $xmlns: customFieldObject = {},
        title,
        entries: items = []
      }
    } = await axios.get(url);

      config.MPX.CUSTOM_FIELD_NAME = Object.keys(customFieldObject)[0];
      const sortedItems = items.sort(byField('season', 'episode'));

      return {
        type: {
          value: types.feed
        },
        title,
        entry: sortedItems.map(mapMediaEpisodes)
      };
  } catch (err) {
    throw err;
  }
}