import { convertDate, createEntry, createSrc, getCustomFields, getSeriesIdNumber, validate } from '../../../utils';
import { types } from '../../../types';
import { config } from '../../../config';


export function mapMediaSeries(series) {
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

  const {
    BASE_URL,
    ACCOUNT,
    FEED_PID
  } = config.MPX;

  const dynamicUrl = `${BASE_URL}/${ACCOUNT}/${FEED_PID}/${seriesIdNumber}`;

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
