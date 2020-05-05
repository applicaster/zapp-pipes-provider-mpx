import { createEntry, createSrc } from '../../../utils';
import { types } from '../../../types';


export function mapShow(show, BASE_URL, episodesPID) {
  const {
    id,
    title = '',
    tvSeasonNumber = '',
    guid = ''
  } = show;

  const dynamicUrl = `${BASE_URL}?seasonId=${id}&episodesPID=${episodesPID}`;

  const content = {
    src: createSrc('seasons', dynamicUrl),
  };

  const extensions = {
    alternate_id: guid,
    tvSeasonNumber
  };

  return createEntry(types.feed, {
    id,
    title,
    content,
    extensions
  });
}
