import {createEntry} from "../../../utils";
import {types} from "../../../types";
import { config } from "../../../config";

export function mapSeasons(seasons) {

  const {
    id,
    title,
    tvSeasonNumber,
    guid,
    description = '',
    seriesId
  } = seasons;

  const linkForAllEpisodesOfSeason = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.episodes}?bySeriesId=${seriesId}&byTvSeasonId=${id}`;

  const metadata = {
    description,
    linkForAllEpisodesOfSeason
  };

  const extensions = {
    alternate_id: guid,
    tvSeasonNumber,
  };

  return createEntry(types.feed, {
    id,
    title,
    extensions,
    metadata
  });
}