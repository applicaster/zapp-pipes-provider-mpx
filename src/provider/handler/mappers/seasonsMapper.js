import { createEntry, createSrc, validate } from '../../../utils';
import { types } from '../../../types';


export function mapSeasons(seasons, BASE_URL, images) {
  const {
    id,
    title = '',
    tvSeasonNumber = '',
    guid = ''
  } = seasons;

  const dynamicUrl = `${BASE_URL}?byTvSeasonId=${id}`;

  const content = {
    src: createSrc('episodes', dynamicUrl),
  };

  const extensions = {
    alternate_id: guid,
    tvSeasonNumber
  };

  return createEntry(types.feed, {
    id,
    title,
    content,
    extensions,
    images: validate(images)
  });
}
