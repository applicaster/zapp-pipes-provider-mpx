import { getCommands } from './comands';
import { updateParamsFromUrl } from '../../middleware';
import { isSearch } from '../../middleware/utils';
import { getSearchResults } from './getSearchResults';

export const handler = nativeBridge => params => {
  let parameters = {...params};
  const { type } = parameters;
  const search = isSearch(parameters);

  if (!type || !['series', 'seasons', 'episodes', 'movies', 'show'].includes(type)) {
    return nativeBridge.throwError('unknown request');
  }

  parameters = updateParamsFromUrl(parameters);

  const handleRequest = async() => {
    return search ? getSearchResults(parameters) : getCommands(parameters)[type](parameters)
  };

  return handleRequest()
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
