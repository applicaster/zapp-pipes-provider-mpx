import { axios } from '../../axios/axios';
import { types } from "../../types";
import { mapShow } from './mappers/showMapper';
import { config } from "../../config";
import { createSrc } from "../../utils";

export async function getShow(params) {
  const { url } = params;

  try {
    const {
      data: item,
    } = await axios.get(url);

    const {
      id: seriesId
    } = item;

    const dynamicUrl = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.seasons}?bySeriesId=${seriesId}`;

    const content = {
      src: createSrc('seasons', dynamicUrl),
    };

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
          content
        }
      ]
    }

  } catch (err) {
    throw err;
  }
}