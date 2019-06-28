import {commands} from './comands';
import {getUrlParams} from "../../utils";

export const handler = nativeBridge => params => {
  const {type} = params;

  if (!type || ['series', 'seasons', 'episode', 'movie'].indexOf(type) === -1) {
    return nativeBridge.throwError('unknown request');
  }

  getUrlParams(params);

  return commands[type](params)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
