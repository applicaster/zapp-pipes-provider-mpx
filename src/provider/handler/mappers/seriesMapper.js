import {convertDate, createEntry} from "../../../utils";
import {types} from "../../../types";

export function mapSeries(series) {

  const {
    id,
    title,
    updated: updated_at,
    pubDate: published_at,
    description,
    credits,
    tags,
    distributionRightIds,
    guid,
    thumbnails: images
  } = series;

  const published = convertDate(published_at, 'LL');
  const updated = convertDate(updated_at);

  const genre = tags.filter(function (item) {
    return item['scheme'] === 'Genre';
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

  return createEntry(types.feed, {
    id,
    title,
    extensions,
    metadata,
    images
  });
}