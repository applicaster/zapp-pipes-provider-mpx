import * as R from 'ramda';
import { convertDate, createEntry, createSrc, validate } from '../../../utils';
import { types } from '../../../types';
import { config } from '../../../config';

export function mapShow(show) {
  const {
    id: seriesId,
    title = '',
    updated: updatedAt = '',
    pubDate: publishedAt = '',
    description: summary = '',
    credits = [],
    tags = [],
    distributionRightIds = [],
    guid = '',
    thumbnails: images = {}
  } = show;

  const dynamicUrl = `${config.MPX.API_BASE_URL}/${config.MPX.ENDPOINTS.seasons}?bySeriesId=${seriesId}&sort=${config.MPX.SORT_BY.seasons}`;

  config.IMAGES = images;

  const content = {
    src: createSrc('seasons', dynamicUrl),
  };

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const metadata = {
    published,
    updated,
    summary,
  };

  const extensions = {
    alternate_id: guid,
    distributionRightIds: validate(distributionRightIds),
    genre: validate(genre),
    credits: validate(credits)
  };

  return  [
    createEntry(types.feed, {
      id: seriesId,
      title,
      metadata,
      content,
      extensions
    }),
    createEntry(types.feed, {
      content
    })
  ]
}
