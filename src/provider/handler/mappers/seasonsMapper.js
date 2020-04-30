import { createEntry, createSrc } from '../../../utils';
import { types } from '../../../types';


export function mapSeasons(seasons, BASE_URL, episodesPID) {
  const {
    id,
    title = '',
    tvSeasonNumber = '',
    guid = ''
  } = seasons;

  const dynamicUrl = `${BASE_URL}?seasonId=${id}&episodesPID=${episodesPID}`;

  const content = {
    src: createSrc('show', dynamicUrl),
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
