import {commands} from './comands';

export const handler = nativeBridge => params => {
  const {type} = params;

  if (!type || !['series', 'seasons', 'episodes', 'movies'].includes(type)) {
    return nativeBridge.throwError('unknown request');
  }

  return commands[type](params)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
