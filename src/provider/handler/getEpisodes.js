import {axios} from '../../axios/axios';
import {mapEpisodes} from './mappers/episodesMapper';
import {mapMediaEpisodes} from './mappers/mediaEpisodesMapper';
import {types} from '../../types';
import { byField, setRange } from "../../utils";
import { config } from "../../config";

export async function getEpisodes(params) {
  let {
    url,
    platform
  } = params;
  url = setRange(url);

  try {
    let  {
      data: {
        $xmlns: customFieldObject = {},
        title,
        entries: items = []
      }
    } = await axios.get(url);

    if (platform === 'media') {
      config.MPX.CUSTOM_FIELD_NAME = Object.keys(customFieldObject)[0];
      items = items.sort(byField(`${config.MPX.CUSTOM_FIELD_NAME}$season`, `${config.MPX.CUSTOM_FIELD_NAME}$episode`));

      return {
        type: {
          value: types.feed
        },
        title,
        entry: items.map(mapMediaEpisodes)
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