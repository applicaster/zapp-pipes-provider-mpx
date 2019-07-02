import * as R from 'ramda'
import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";


export function mapEpisodes(episodes) {

  const {
    id,
    title,
    updated: updatedAt,
    pubDate: publishedAt,
    description,
    credits,
    tags,
    tvSeasonEpisodeNumber,
    tvSeasonNumber,
    media: [
      {
        publicUrl: src
      }
    ],
    distributionRightIds,
    guid,
    thumbnails: images
  } = episodes;

  const published = convertDate(publishedAt, 'LL');
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const media = {
    content: {
      type: 'video/hls',
      src
    }
  };

  const metadata = {
    published,
    updated,
    description,
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
    extensions,
    metadata,
    images,
    media,
  });
}