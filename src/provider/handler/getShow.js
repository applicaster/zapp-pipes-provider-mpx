import { axios } from '../../axios/axios';
import { types } from "../../types";
import { mapShow } from './mappers/showMapper';
import { mapSeriesTvSeasons } from './mappers/seriesTvSeasonsMapper';

export async function getShow(params) {
  const { url } = params;

  try {
    const {
      data: item,
    } = await axios.get(url);

    const {
      seriesTvSeasons,
      id: seriesId
    } = item;

    const seasonsArr = seriesTvSeasons
      .reverse()
      .map(season => {
      return {
        ...season,
        seriesId
      }
    });

    return {
      type: {
        value: types.feed
      },
      entry: [
        mapShow(item),
        {
          type: {
            value: types.feed
          },
          entry: seasonsArr.map(mapSeriesTvSeasons)
        }
      ]
    }

  } catch (err) {
    throw err;
  }
}