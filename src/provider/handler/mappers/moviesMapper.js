import * as R from "ramda";
import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";

export function mapMovies(movies) {

  const {
    id,
    title,
    updated: updatedAt,
    pubDate: publishedAt,
    description,
    credits,
    tags,
    media: [
      {
        publicUrl: src,
        availableDate: availableAtDate
      }
    ],
    distributionRightIds,
    guid,
    thumbnails: images
  } = movies;

  const published = convertDate(publishedAt, 'LL');
  const updated = convertDate(updatedAt);
  const availableDate = convertDate(availableAtDate);

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