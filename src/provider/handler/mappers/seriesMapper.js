import * as R from "ramda";
import { convertDate, createEntry, createSrc } from "../../../utils";
import {types} from "../../../types";
import { config } from "../../../config";

export function mapSeries(series) {

  const {
    id,
    title,
    updated: updatedAt,
    pubDate: publishedAt,
    description,
    credits,
    tags,
    distributionRightIds,
    guid,
    thumbnails: images
  } = series;

  const dynamicUrl = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.seasons}?bySeriesId=${id}&sort=${config.MPX.SORT_BY.seasons}`;

  const published = convertDate(publishedAt, 'LL');
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const content = {
    src: createSrc('seasons', dynamicUrl),
  };

  const metadata = {
    published,
    updated,
    description,
  };

  const extensions = {
    alternate_id: guid,
    distributionRightIds,
    genre,
    credits,
  };

  return createEntry(types.feed, {
    id,
    title,
    metadata,
    content,
    images,
    extensions,
  });
}