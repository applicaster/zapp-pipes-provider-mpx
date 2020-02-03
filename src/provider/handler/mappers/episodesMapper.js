import * as R from 'ramda'
import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";


export function mapEpisodes(episodes) {

  const {
    id,
    updated: updatedAt,
    pubDate: publishedAt,
    description: summary = '',
    credits,
    tags,
    tvSeasonEpisodeNumber,
    tvSeasonNumber,
    media: [
      {
        title,
        publicUrl: src
      }
    ],
    distributionRightIds,
    guid,
    thumbnails: images
  } = episodes;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

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
    tvSeasonNumber: `Season ${tvSeasonNumber}`,
    tvSeasonEpisodeNumber: `Episode ${tvSeasonEpisodeNumber}`,
    distributionRightIds,
    genre,
    credits,
  };

  return createEntry(types.video, {
    id,
    title,
    metadata,
    images,
    content,
    extensions,
  });
}
