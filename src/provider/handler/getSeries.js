import { axios } from '../../axios/axios';
import { mapSeries } from './mappers/seriesMapper';
import { types } from '../../types';


export async function getSeries(params) {
  const { url, BASE_URL, episodesPID } = params;

  try {
    const { data } = await axios.get(url);
    const items = data.entries ? data.entries : [data];

    const entry = items.map((item) => mapSeries(item, BASE_URL, episodesPID));

    return {
      type: {
        value: types.feed
      },
      title: data.title,
      entry
    };
  } catch (err) {
    throw err;
  }
}
