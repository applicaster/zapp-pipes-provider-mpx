import { parse as parseUrl, format } from 'url';
import { config } from '../config';

function updateQuery(query, limit, q) {
  const newQuery = { ...query };

  Object.keys(newQuery).forEach(key => {
    if (key === 'form') {
      newQuery[key] = 'cjson';
    }
  });

  const updatedQuery = q ? { ...newQuery, q } : newQuery;
  return limit ? { ...updatedQuery, 'range': `-${limit}` } : updatedQuery;
}

function setQueryParams(params) {
  const { url, limit, q } = params;
  const aUrl = parseUrl(url, true);

  return format({
    protocol: aUrl.protocol,
    hostname: aUrl.hostname,
    pathname: aUrl.pathname,
    query: updateQuery(aUrl.query, limit, q)
  });
}

function getPlatform (url) {
  const aUrl = parseUrl(url, true);
  return aUrl.host === config.MPX.MEDIA_BASE_HOST ? 'media' : 'entertainment';
}

function isSearch(params) {
  const { url } = params;
  const aUrl = parseUrl(url, true);

  return params.q && !aUrl.query.q;
}

export {
  setQueryParams,
  getPlatform,
  isSearch
}
