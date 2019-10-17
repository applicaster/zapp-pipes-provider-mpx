import {axios} from '../../axios/axios';
import {mapMovies} from './mappers/moviesMapper';
import {types} from '../../types';
import { setRange, updateParamsFromUrl } from "../../utils";

export async function getMovies(params) {
  params = updateParamsFromUrl(params);

  let {url} = params;
  url = setRange(url);

  try {
    const {
      data: {
        title,
        entries: items = []
      }
    } = await axios.get(`${url}`);
    
    return {
      type: {
        value: types.feed
      },
      title,
      entry: items.map(mapMovies)
    };
  } catch (err) {
    throw err;
  }
}