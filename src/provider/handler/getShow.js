import { axios } from '../../axios/axios';
import { types } from "../../types";
import { mapShow } from './mappers/showMapper';

export async function getShow(params) {
  const { url } = params;

  try {
    const {
      data: item,
    } = await axios.get(url);

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