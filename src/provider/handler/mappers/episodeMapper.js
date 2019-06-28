import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";

export function mapEpisode(episode) {

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
  } = episode;

  const published = convertDate(publishedAt, 'LL');
  const updated = convertDate(updatedAt);

  const genre = tags.filter( item => {
    const {scheme} = item;
    return scheme === 'Genre';
  });

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