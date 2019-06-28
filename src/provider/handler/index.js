import {commands} from './comands';
import {getUrlParams} from "../../utils";

export const handler = nativeBridge => params => {
  const {type} = params;

  if (!type || !['series', 'seasons', 'episode', 'movie'].includes(type)) {
    return nativeBridge.throwError('unknown request');
  }

  params = getUrlParams(params);

  return commands[type](params)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
