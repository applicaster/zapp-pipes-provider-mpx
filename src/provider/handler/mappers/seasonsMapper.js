import {createEntry, createSrc} from "../../../utils";
import {types} from "../../../types";
import { config } from "../../../config";

export function mapSeasons(seasons) {

  const {
    id,
    title,
    tvSeasonNumber,
    guid,
    description = '',
    seriesId,
  } = seasons;

  const dynamicUrl = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.episodes}?bySeriesId=${seriesId}&byTvSeasonId=${id}`;

  const content = {
    src: createSrc('episodes', dynamicUrl),
  };

  const metadata = {
    description,
  };

  const extensions = {
    alternate_id: guid,
    tvSeasonNumber,
  };

  return createEntry(types.feed, {
    id,
    title,
    metadata,
    content,
    extensions,
  });
}