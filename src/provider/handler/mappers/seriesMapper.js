import * as R from "ramda";
import { convertDate, createEntry, createSrc, getSeriesIdNumber } from "../../../utils";
import { types } from "../../../types";
import { config } from "../../../config";

export function mapSeries(series, apiBaseUrl) {

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

  console.log(apiBaseUrl, 'ssssssssss');

  const seriesIdNumber = getSeriesIdNumber(id);

  const dynamicUrl = `${apiBaseUrl}/${config.MPX.ENDPOINTS.series}/${seriesIdNumber}`;

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