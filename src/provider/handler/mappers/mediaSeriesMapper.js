import { convertDate, createEntry, createSrc, getCustomFields } from "../../../utils";
import { types } from "../../../types";
import { config } from "../../../config";

export function mapMediaSeries(series) {

  const {
    guid: id,
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

  const dynamicUrl = `${config.MPX.URL}?form=cjson&byCustomValue={showTitle}{${showTitle}}`;

  const published = convertDate(publishedAt);

  const content = {
    src: createSrc('seasons', dynamicUrl),
  };

  const metadata = {
    summary,
    published,
  };

  const extensions = {
    cast,
    director,
    genre,
    rating,
    longDescription
  };

  return createEntry(types.feed, {
    id,
    title: showTitle,
    metadata,
    images,
    content,
    extensions,
  });
}