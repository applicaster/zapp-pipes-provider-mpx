import * as R from 'ramda';
import { convertDate, createEntry, createSrc, getSeriesIdNumber, validate } from '../../../utils';
import { types } from '../../../types';


export function mapSeries(series, BASE_URL, episodesPID) {
  const {
    id,
    title = '',
    updated: updatedAt = '',
    pubDate: publishedAt = '',
    description: summary = '',
    credits = [],
    tags = [],
    distributionRightIds = [],
    guid = '',
    thumbnails: images = {}
  } = series;

  const seriesIdNumber = getSeriesIdNumber(id);
  const dynamicUrl = `${BASE_URL}/${seriesIdNumber}?episodesPID=${episodesPID}`;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const content = {
    src: createSrc('show', dynamicUrl)
  };

  const metadata = {
    published,
    updated,
    summary
  };

  const extensions = {
    alternate_id: guid,
    distributionRightIds: validate(distributionRightIds),
    genre: validate(genre),
    credits: validate(credits)
  };

  return createEntry(types.feed, {
    id,
    title,
    metadata,
    content,
    images: validate(images),
    extensions
  });
}
