import { axios } from '../../axios/axios';
import { mapEpisodes } from './mappers/episodesMapper';
import { mapMediaEpisodes } from "./mappers/mediaEpisodesMapper";
import { types } from '../../types';


export async function getEpisodes(params) {
  const { url, platform } = params;

  const mapperCallback = (platform === 'media') ? mapMediaEpisodes : mapEpisodes;

  try {
    const  {
      data: {
        title,
        entries: items = []
      }
    } = await axios.get(url);

    return {
      type: {
        value: types.feed
      },
      title,
      entry: items.map(mapperCallback)
    };
  } catch (err) {
    throw err;
  }
}
