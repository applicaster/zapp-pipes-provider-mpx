import * as R from "ramda";
import {convertDate, createEntry} from "../../../utils";
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

  const src = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.seasons}?bySeriesId=${id}`;

  const published = convertDate(publishedAt, 'LL');
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const content = {
    type: 'feed',
    src
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
    images,
    content,
    extensions,
  });
}