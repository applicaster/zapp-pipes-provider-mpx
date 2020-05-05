import { axios } from '../../axios/axios';
import { types } from '../../types';
import { mapEpisodes } from './mappers/episodesMapper';

export async function getSeason(params) {
  const { url, seriesUrl } = params;

  try {
    const {
      data: {
        title,
        entries: items = []
    }
    } = await axios.get(url);

    const { data: seriesData = {} } = await axios.get(seriesUrl);

    items.unshift(seriesData);

    return {
      type: {
        value: types.feed
      },
      title,
      entry: items.map(mapEpisodes)
    }

  } catch (err) {
    throw err;
  }
}
