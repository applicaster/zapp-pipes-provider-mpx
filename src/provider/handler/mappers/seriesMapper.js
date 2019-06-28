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

  const genre = tags.filter( item => {
    const {scheme} = item;
    return scheme === 'Genre';
  });

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

  // return series;

  return createEntry(types.feed, {
    id,
    title,
    extensions,
    metadata,
    images
  });
}