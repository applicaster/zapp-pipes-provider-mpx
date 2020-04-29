import { convertDate, createEntry, createSrc, getCustomFields } from "../../../utils";
import {types} from "../../../types";


export function mapMediaShow(show, BASE_URL) {
  const {
    id,
    guid,
    title,
    pubDate: publishedAt,
    description: summary = '',
  } = show;

  const {
    cast,
    director,
    genre,
    rating,
    longDescription,
    showTitle
  } = getCustomFields(show);

  const dynamicUrl = `${BASE_URL}?byCustomValue={showTitle}{${showTitle}}`;

  const published = convertDate(publishedAt);

  const content = {
    src: createSrc('seasons', dynamicUrl),
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

  return  [
    createEntry(types.feed, {
      id,
      title,
      metadata,
      content,
      extensions
    }),
    createEntry(types.feed, {
      content
    })
  ]
}
