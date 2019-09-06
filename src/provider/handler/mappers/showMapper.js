import * as R from "ramda";
import { convertDate, createEntry } from "../../../utils";
import { types } from "../../../types";

export function mapShow(show) {
  const {
    id: seriesId,
    title,
    updated: updatedAt,
    pubDate: publishedAt,
    description: summary = '',
    credits,
    tags,
    distributionRightIds,
    guid,
    thumbnails: images
  } = show;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const metadata = {
    published,
    updated,
    summary,
  };

  const extensions = {
    alternate_id: guid,
    distributionRightIds,
    genre,
    credits,
  };

  return createEntry(types.feed, {
      id: seriesId,
      title,
      metadata,
      images,
      extensions
  });
}