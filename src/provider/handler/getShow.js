import { axios } from '../../axios/axios';
import { types } from "../../types";
import { mapShow } from './mappers/showMapper';
import { mapMediaShow } from "./mappers/mediaShowMapper";

export async function getShow(params) {
  const {
    url,
    platform
  } = params;

  try {
    const {
      data: item,
    } = await axios.get(url);

    if (platform === 'media') {

      return {
        type: {
          value: types.feed
        },
        entry: mapMediaShow(item)
      };
    }

    return {
      type: {
        value: types.feed
      },
      entry: mapShow(item)
    }

  } catch (err) {
    throw err;
  }
}