import { axios } from '../../axios/axios';
import { types } from "../../types";
import { mapMediaShow } from "./mappers/mediaShowMapper";

export async function getMediaShow(params) {
  const { url } = params;

  try {
    const {
      data: item,
    } = await axios.get(url);

    return {
      type: {
        value: types.feed
      },
      entry: mapMediaShow(item)
    };

  } catch (err) {
    throw err;
  }
}