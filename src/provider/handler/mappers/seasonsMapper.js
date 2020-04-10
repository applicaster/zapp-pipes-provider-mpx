import { createEntry, createSrc, validate } from '../../../utils';
import { types } from '../../../types';
import { config } from '../../../config';


export function mapSeasons(seasons, images) {
  const {
    id,
    title = '',
    tvSeasonNumber = '',
    guid = ''
  } = seasons;

  const {
    BASE_URL,
    EPISODES_PID,
    ACCOUNT
  } = config.MPX;

  const dynamicUrl = `${BASE_URL}/${ACCOUNT}/${EPISODES_PID}?byTvSeasonId=${id}`;

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
