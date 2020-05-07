import { axios } from '../../axios/axios';
import { types } from '../../types';
import { mapSeasons } from './mappers/seasonsMapper';

export async function getSeasons(params) {
  const { url, BASE_URL, episodesPID, seasonId } = params;

  try {
    const { data: item } = await axios.get(url);

    return {
      type: {
        value: types.feed
      },
      entry: [
          mapSeasons(item, BASE_URL, episodesPID, seasonId, url)
        ]
    }

  } catch (err) {
    throw err;
  }
}
