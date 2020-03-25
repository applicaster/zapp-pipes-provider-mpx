import { parse as parseUrl } from 'url';
import { config } from '../config';
import { getPlatform, setQueryParams } from './utils';

export function updateParamsFromUrl(params) {
  const parameters = {...params};
  const { url, type } = parameters;

  try {
    const platform = getPlatform(url);
    const aUrl = parseUrl(url, true);

    config.MPX.URL = `${aUrl.protocol}//${aUrl.host}${aUrl.pathname}`;

    if(platform === 'media') {
      parameters.mediaBaseUrl = `${aUrl.protocol}//${aUrl.host}${aUrl.pathname}`;
    }

    const arr = aUrl.pathname.split('/');
    arr.pop();

    if(type === 'show' && platform !== 'media') {
      arr.pop();
    }

    const path = arr.join('/');
    const queryParams = {...aUrl.query};

    Object.keys(queryParams).forEach(key => {
      if (!parameters[key]) {
        parameters[key] = queryParams[key];
      }
    });

    config.MPX.API_BASE_URL = `${aUrl.protocol}//${aUrl.host}${path}`;

    parameters.entertainmentBaseUrl = `${aUrl.protocol}//${aUrl.host}${path}`;
    parameters.platform = platform;
    parameters.url = setQueryParams(parameters);

    return parameters;
  } catch (err) {
    throw (err)
  }
}
