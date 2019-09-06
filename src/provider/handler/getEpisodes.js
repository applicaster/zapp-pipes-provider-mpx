import { axios } from '../../axios/axios';
import { mapEpisodes } from './mappers/episodesMapper';
import { mapMediaEpisodes } from './mappers/mediaEpisodesMapper';
import { types } from '../../types';
import { byField, setRange } from "../../utils";
import { config } from "../../config";

export async function getEpisodes(params) {
  let { url } = params;

  const { platform } = params;
  url = setRange(url);

  try {
    const  {
      data: {
        $xmlns: customFieldObject = {},
        title,
        entries: items = []
      }
    } = await axios.get(url);

    if (platform === 'media') {
      config.MPX.CUSTOM_FIELD_NAME = Object.keys(customFieldObject)[0];
      const sortedItems = items.sort(byField('season', 'episode'));

      return {
        type: {
          value: types.feed
        },
        title,
        entry: sortedItems.map(mapMediaEpisodes)
      };
    }

    return {
      type: {
        value: types.feed
      },
      title,
      entry: items.map(mapEpisodes)
    };
  } catch (err) {
    throw err;
  }
}