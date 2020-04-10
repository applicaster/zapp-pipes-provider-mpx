import { mapSeasons } from './mappers/seasonsMapper';
import { axios } from '../../axios/axios';
import { types } from '../../types';


export async function getSeasons(params) {
  const { url, BASE_URL } = params;

  try {
    const { data } = await axios.get(url);

    const items = data.entries ? data.entries : data.seriesTvSeasons;

    return {
      type: {
        value: types.feed
      },
      title: data.title,
      entry: items.map((item) => mapSeasons(item, BASE_URL, data.thumbnails))
    };
  } catch (err) {
    throw err;
  }
}
