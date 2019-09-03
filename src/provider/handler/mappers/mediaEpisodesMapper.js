import {convertDate, createEntry, getCustomFields} from "../../../utils";
import {types} from "../../../types";

export function mapMediaEpisodes(episodes) {

  const {
    guid: id,
    pubDate: publishedAt,
    description: summary = '',
    content: [
      {
        url: src,
        duration
      }
    ],
    thumbnails: images
  } = episodes;

  const {
    cast,
    director,
    genre,
    rating,
    longDescription,
    season,
    episode
  } = getCustomFields(episodes);

  const published = convertDate(publishedAt);

  const media = {
    content: {
      type: 'video/hls',
      src
    }
  };

  const metadata = {
    summary,
    published,
  };

  const extensions = {
    duration,
    cast,
    director,
    genre,
    rating,
    longDescription,
    season
  };

  return createEntry(types.video, {
    id,
    title: `Episode ${episode}`,
    metadata,
    images,
    media,
    extensions,
  });
}