import { convertDate, createEntry, createSrc, getCustomFields, getSeriesIdNumber } from "../../../utils";
import { types } from "../../../types";
import { config } from "../../../config";

export function mapMediaSeries(series) {

  const {
    id,
    guid,
    title,
    pubDate: publishedAt,
    description: summary = '',
    thumbnails: images,
  } = series;

  const {
    cast,
    director,
    genre,
    rating,
    longDescription,
    showTitle
  } = getCustomFields(series);

  const seriesIdNumber = getSeriesIdNumber(id);

  const dynamicUrl = `${config.MPX.URL}/${seriesIdNumber}?form=cjson`;

  const published = convertDate(publishedAt);

  const content = {
    src: createSrc('show', dynamicUrl),
  };

  const metadata = {
    summary,
    published,
  };

  const extensions = {
    alternate_id: guid,
    cast,
    director,
    genre,
    rating,
    longDescription,
    showTitle
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