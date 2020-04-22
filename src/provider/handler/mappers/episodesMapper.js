import * as R from 'ramda'
import { convertDate, createEntry, validate } from "../../../utils";
import { types } from "../../../types";


export function mapEpisodes(episodes) {

  const {
    id = '',
    updated: updatedAt = '',
    pubDate: publishedAt = '',
    description: summary = '',
    credits: creditsArr = [],
    tags = [],
    tvSeasonEpisodeNumber = '',
    tvSeasonNumber = '',
    media: [
      {
        title = '',
        publicUrl: src = '',
        restrictionId = ''
      }
    ],
    distributionRightIds: distributionIds = [],
    guid = '',
    thumbnails: images = {}
  } = episodes;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

  const content = {
    type: 'video/hls',
    src
  };

  const metadata = {
    published,
    updated,
    summary,
  };

  const distributionRightIds = validate(distributionIds);
  const genre = validate(R.filter(R.propEq('scheme', 'Genre'))(tags));
  const credits = validate(creditsArr);
  const requires_authentication = restrictionId ? Boolean(restrictionId) : undefined;

  const extensions = {
    alternate_id: guid,
    tvSeasonNumber: `Season ${tvSeasonNumber || ''}`,
    tvSeasonEpisodeNumber: `Episode ${tvSeasonEpisodeNumber || ''}`,
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
