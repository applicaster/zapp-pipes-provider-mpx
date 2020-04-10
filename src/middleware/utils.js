import { parse as parseUrl, format } from 'url';
import { config } from '../config';

function updateQuery(query, limit, q) {
  const newQuery = {
    form: 'cjson'
  };

  Object.keys(query).forEach(key => {
    if (key !== 'limit'
      && key !== 'episodesPID'
      && key !== 'form'
    ) {
      newQuery[key] = query[key]
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
  const { MEDIA_BASE_HOST } = config.MPX;
  return aUrl.host.includes(MEDIA_BASE_HOST) ? 'media' : 'entertainment';
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
