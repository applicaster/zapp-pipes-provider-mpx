import {convertDate, createEntry, getCustomFields} from "../../../utils";
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
    longDescription
  } = getCustomFields(episodes);

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

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
    longDescription
  };

  return createEntry(types.video, {
    id: id || guid,
    title,
    metadata,
    images,
    content,
    extensions
  });
}
