import { convertDate, createEntry, createSrc, getCustomFields, validate } from "../../../utils";
import {types} from "../../../types";
import { config } from "../../../config";

export function mapMediaSeasons(seasons) {

  const {
    id,
    guid,
    pubDate: publishedAt,
    description: summary = '',
    thumbnails: images,
  } = seasons;

  const {
    cast,
    director,
    genre,
    rating,
    longDescription,
    showTitle,
    season
  } = getCustomFields(seasons);

  const dynamicUrl = `${config.MPX.URL}?form=cjson&byCustomValue={showTitle}{${showTitle}},{season}{${season}}`;

  const published = convertDate(publishedAt);

  const content = {
    src: createSrc('episodes', dynamicUrl),
  };

  const metadata = {
    summary,
    published,
  };

  const extensions = {
    alternate_id: guid,
    cast,
    director,
    genre,
    rating,
    longDescription,
    showTitle
  };

  return createEntry(types.feed, {
    id,
    title: `Season ${season}`,
    metadata,
    images: validate(images),
    content,
    extensions,
  });
}
