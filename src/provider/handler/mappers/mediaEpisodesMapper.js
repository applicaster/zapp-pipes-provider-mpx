import { convertDate, createEntry, getCustomFields, validate } from "../../../utils";
import {types} from "../../../types";

export function mapMediaEpisodes(episodes) {

  const {
    id,
    guid,
    title,
    updated: updatedAt,
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

  const published = publishedAt ? convertDate(publishedAt) : undefined;
  const updated = updatedAt ? convertDate(updatedAt) : undefined;

  const content = {
    type: 'video/hls',
    src
  };

  const metadata = {
    summary,
    published,
    updated
  };

  const extensions = {
    alternate_id: guid,
    duration,
    cast,
    director,
    genre,
    rating,
    longDescription,
    season: season ? `Season ${season}` : undefined,
    episode: episode ? `Episode ${episode}` : undefined
  };

  return createEntry(types.video, {
    id: id || guid,
    title,
    metadata,
    images: validate(images),
    content,
    extensions
  });
}
