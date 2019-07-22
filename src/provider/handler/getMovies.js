import {axios} from '../../axios/axios';
import {mapMovies} from './mappers/moviesMapper';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getMovies(params) {
  let { url } = params;
  url = setRange(url);

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(`${url}`);
    
    return {
      type: {
        value: types.feed
      },
      entry: items.map(mapMovies)
    };
  } catch (err) {
    throw err;
  }
}