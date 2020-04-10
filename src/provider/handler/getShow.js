import { axios } from '../../axios/axios';
import { types } from '../../types';
import { mapShow } from './mappers/showMapper';

export async function getShow(params) {
  const { url, BASE_URL, episodesPID } = params;

  try {
    const { data: item } = await axios.get(url);

    return {
      type: {
        value: types.feed
      },
      entry: mapShow(item, BASE_URL, episodesPID)
    }

  } catch (err) {
    throw err;
  }
}
