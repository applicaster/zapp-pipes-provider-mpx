import { parse as parseUrl } from 'url';
import { getPlatform, setQueryParams, createBaseUrl } from './utils';

export function updateParamsFromUrl(params) {
  const parameters = {...params};
  const { url } = parameters;

  try {
    const aUrl = parseUrl(url, true);

    const queryParams = {...aUrl.query};
    Object.keys(queryParams).forEach(key => {
      if (!parameters[key]) {
        parameters[key] = queryParams[key];
      }
    });

    parameters.platform = getPlatform(url);
    parameters.BASE_URL = createBaseUrl(parameters);
    parameters.url = setQueryParams(parameters);

    return parameters;
  } catch (err) {
    throw (err)
  }
}
