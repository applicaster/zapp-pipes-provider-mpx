import { parse as parseUrl } from 'url';
import { config } from '../config';
import { getPlatform, setQueryParams } from './utils';

export function updateParamsFromUrl(params) {
  const parameters = {...params};
  const { url } = parameters;

  try {
    const aUrl = parseUrl(url, true);
    const arr = aUrl.pathname.split('/');
    const [x, feedIndicator, accountPID, feedPID] = arr;

    config.MPX = {
      ...config.MPX,
      BASE_URL: `${aUrl.protocol}//${aUrl.host}/${feedIndicator}`,
      ACCOUNT: accountPID,
      URL: `${aUrl.protocol}//${aUrl.host}${aUrl.pathname}`,
      FEED_PID: feedPID
    };

    if (parameters.episodesPID) {
      config.MPX.EPISODES_PID = parameters.episodesPID;
    }

    const queryParams = {...aUrl.query};
    Object.keys(queryParams).forEach(key => {
      if (!parameters[key]) {
        parameters[key] = queryParams[key];
      }
    });

    parameters.platform = getPlatform(url);
    parameters.url = setQueryParams(parameters);

    return parameters;
  } catch (err) {
    throw (err)
  }
}
