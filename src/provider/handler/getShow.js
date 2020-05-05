import { mapShow } from './mappers/showMapper';
import { axios } from '../../axios/axios';
import { types } from '../../types';


export async function getShow(params) {
  const { url, BASE_URL, episodesPID } = params;

  try {
    const { data } = await axios.get(url);

    const items = data.entries ? data.entries : data.seriesTvSeasons;

    return {
      type: {
        value: types.feed
      },
      title: data.title,
      entry: items.map((item) => mapShow(item, BASE_URL, episodesPID))
    };
  } catch (err) {
    throw err;
  }
}
