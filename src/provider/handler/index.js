import { getCommands } from './comands';
import { updateParamsFromUrl } from '../../middleware';
import { isSearch } from '../../middleware/utils';
import { getSearchResults } from './getSearchResults';
import { manifest } from '../manifest';


export const handler = nativeBridge => params => {
  let parameters = {...params};
  const { type } = parameters;
  const { handlers } = manifest;
  const search = isSearch(parameters);


  if (!type || !handlers.includes(type)) {
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
