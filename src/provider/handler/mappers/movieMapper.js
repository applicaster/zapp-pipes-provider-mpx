import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";

export function mapMovie(movie) {

  const {
    id,
    title,
    updated: updated_at,
    pubDate: published_at,
    description,
    credits,
    tags,
    media: [
      {
        publicUrl: src,
        availableDate: available_date
      }
    ],
    distributionRightIds,
    guid,
    thumbnails: images
  } = movie;

  const published = convertDate(published_at, 'LL');
  const updated = convertDate(updated_at);
  const availableDate = convertDate(available_date);

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
    availableDate,
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