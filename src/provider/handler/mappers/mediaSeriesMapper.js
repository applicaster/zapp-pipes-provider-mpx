import { convertDate, createEntry, createSrc, getCustomFields, getSeriesIdNumber, validate } from '../../../utils';
import { types } from '../../../types';


export function mapMediaSeries(series, BASE_URL) {
  const {
    id,
    guid,
    title,
    pubDate: publishedAt,
    description: summary = '',
    thumbnails: images
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

  const dynamicUrl = `${BASE_URL}/${seriesIdNumber}`;

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
    images: validate(images),
    content,
    extensions,
  });
}
