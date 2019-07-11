import {axios} from '../../axios/axios';
import {mapMovies} from './mappers/moviesMapper';
import {types} from '../../types';
import { setRange } from "../../utils";

export async function getMovies(params) {
  const { url } = params;

  try {
    const {
      data: {
        entries: items = []
      }
    } = await axios.get(`${url}${setRange(params)}`);
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