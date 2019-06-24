import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";

export function mapEpisode(episode) {

  const {
    id,
    title,
    updated: updated_at,
    pubDate: published_at,
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

  const published = convertDate(published_at, 'LL');
  const updated = convertDate(updated_at);

  const genre = tags.filter(function (item) {
    return item['scheme'] === 'Genre'
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