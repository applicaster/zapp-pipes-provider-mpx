import { types } from '../../types';
import { createEntry, createSrc } from '../../utils';


export async function getSearchResults(params) {
  const { url, type } = params;

  try {
    const content = {
      src: createSrc(type, url)
    };

    return {
      type: {
        value: types.feed
      },
      title: 'Search Results',
      entry: createEntry(types.feed, { content })
    };
  } catch (err) {
    throw err;
  }
}
