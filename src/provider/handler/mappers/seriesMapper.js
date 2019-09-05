import * as R from "ramda";
import { convertDate, createEntry, createSrc, getSeriesIdNumber } from "../../../utils";
import { types } from "../../../types";
import { config } from "../../../config";

export function mapSeries(series) {

  const {
    id,
    title,
    updated: updatedAt,
    pubDate: publishedAt,
    description: summary = '',
    credits,
    tags,
    distributionRightIds,
    guid,
    thumbnails: images
  } = series;

  const seriesIdNumber = getSeriesIdNumber(id);

  const dynamicUrl = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.series}/${seriesIdNumber}`;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const content = {
    src: createSrc('show', dynamicUrl),
  };

  const metadata = {
    published,
    updated,
    summary,
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