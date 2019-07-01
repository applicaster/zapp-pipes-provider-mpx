import * as R from "ramda";
import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";

export function mapSeries(series) {

  const {
    id,
    title,
    updated: updatedAt,
    pubDate: publishedAt,
    description,
    credits,
    tags,
    distributionRightIds,
    guid,
    thumbnails: images
  } = series;

  const published = convertDate(publishedAt, 'LL');
  const updated = convertDate(updatedAt);

  const genre = R.filter(R.propEq('scheme', 'Genre'))(tags);

  const metadata = {
    published,
    updated,
    description,
  };

  const extensions = {
    alternate_id: guid,
    distributionRightIds,
    genre,
    credits,
  };

  return createEntry(types.feed, {
    id,
    title,
    extensions,
    metadata,
    images
  });
}