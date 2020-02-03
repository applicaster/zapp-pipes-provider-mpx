import {getCommands} from './comands';
import { updateParamsFromUrl } from '../../utils';

export const handler = nativeBridge => params => {
  let parameters = {...params};
  const {type} = parameters;

  if (!type || !['series', 'seasons', 'episodes', 'movies', 'show'].includes(type)) {
    return nativeBridge.throwError('unknown request');
  }

  parameters = updateParamsFromUrl(parameters);

  return getCommands(parameters)[type](parameters)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
