import {commands} from './comands';
import { isValidUrl, updateParamsFromUrl } from "../../utils";

export const handler = nativeBridge => params => {
  let parameters = {...params};
  const {
    type,
    url
  } = parameters;

  if (!type || !['series', 'seasons', 'episodes', 'movies'].includes(type)) {
    return nativeBridge.throwError('unknown request');
  }

  if(!isValidUrl(type, url)) {
    return nativeBridge.throwError('invalid url');
  }

  parameters = updateParamsFromUrl(parameters);

  return commands[type](parameters)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
