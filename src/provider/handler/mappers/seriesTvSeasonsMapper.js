import { createEntry, createSrc } from "../../../utils";
import { config } from "../../../config";
import { types } from "../../../types";

export function mapSeriesTvSeasons(season) {
  const {
    id: seasonId,
    guid,
    tvSeasonNumber,
    title
  } = season;

  const dynamicUrl = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.episodes}?byTvSeasonId=${seasonId}`;

  const content = {
    src: createSrc('episodes', dynamicUrl),
  };

  const extensions = {
    alternate_id: guid,
    tvSeasonNumber
  };

  return createEntry(types.feed, {
    id: seasonId,
    title,
    content,
    extensions
  })
}