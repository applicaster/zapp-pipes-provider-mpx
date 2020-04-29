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
    credits: creditsArr = [],
    tags = [],
    media: [
      {
        publicUrl: src = '',
        availableDate: availableAtDate = '',
        restrictionId = ''
      }
    ],
    distributionRightIds: distributionIds = [],
    guid = '',
    thumbnails: images = {}
  } = movies;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);
  const availableDate = convertDate(availableAtDate);

  const genre = validate(R.filter(R.propEq('scheme', 'Genre'))(tags));
  const distributionRightIds = validate(distributionIds);
  const credits = validate(creditsArr);
  const requires_authentication = restrictionId ? Boolean(restrictionId) : undefined;

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
    distributionRightIds,
    genre,
    credits,
    requires_authentication
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
