import {createEntry} from "../../../utils";
import {types} from "../../../types";

export function mapSeasons(seasons) {

  const {
    id,
    title,
    tvSeasonNumber,
    guid,
    description = '',
  } = seasons;

  const metadata = {
    description
  };

  const extensions = {
    alternate_id: guid,
    tvSeasonNumber,
  };

  return createEntry(types.feed, {
    id,
    title,
    ...metadata,
    extensions
  });
}