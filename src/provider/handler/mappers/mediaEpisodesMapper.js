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

  const {showTitle} = getCustomFields(episodes);

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
    ... getCustomFields(episodes)
  };

  return createEntry(types.video, {
    id,
    title: showTitle,
    metadata,
    images,
    media,
    extensions,
  });
}