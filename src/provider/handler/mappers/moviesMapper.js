import * as R from 'ramda';
import { convertDate, createEntry, validate } from '../../../utils';
import { types } from '../../../types';

export function mapMovies(movies) {

  const {
    id = '',
    title = '',
    updated: updatedAt = '',
    pubDate: publishedAt = '',
    description: summary = '',
    credits = [],
    tags = [],
    media: [
      {
        publicUrl: src = '',
        availableDate: availableAtDate = ''
      }
    ],
    distributionRightIds = [],
    guid = '',
    thumbnails: images = {}
  } = movies;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);
  const availableDate = convertDate(availableAtDate);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const content = {
    type: 'video/hls',
    src
  };

  const metadata = {
    published,
    updated,
    summary,
  };

  const extensions = {
    alternate_id: guid,
    availableDate,
    distributionRightIds: validate(distributionRightIds),
    genre: validate(genre),
    credits: validate(credits)
  };

  return createEntry(types.video, {
    id,
    title,
    metadata,
    images: validate(images),
    content,
    extensions,
  });
}
