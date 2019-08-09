import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";


export function mapMediaEpisodes(episodes) {

  const {
    guid: id,
    title,
    pubDate: publishedAt,
    pl1$longDescription: summary = '',
    pl1$genre: genre,
    pl1$cast: cast,
    pl1$director: director,
    content: [
      {
        url: src,
        duration
      }
    ],
    thumbnails: images
  } = episodes;

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

  const credits = {
    director,
    cast
  };

  const extensions = {
    duration,
    genre,
    credits,
  };

  return createEntry(types.video, {
    id,
    title,
    metadata,
    images,
    media,
    extensions,
  });
}