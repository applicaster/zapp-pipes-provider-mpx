import moment from 'moment/moment';
import {parse as parseUrl, format} from 'url';
import btoa from "btoa";
import {config} from '../config';
import {types} from '../types';

export function createMediaItem(images) {

  if (images === undefined || images === null) {
    return undefined;
  }

  const imagesKeys = Object.keys(images);
  let baseImage = false;
  const widthArr = [];

  const result = imagesKeys.map(imageKey => {

    const {
      width,
      height,
      url
    } = images[imageKey];

    widthArr.push(width);

    const key = `image_${width}_x_${height}`;

    function getBaseImage () {
      if(!baseImage
        && width > config.IMAGE.baseMinWidth
        && width < config.IMAGE.baseMaxWidth
        && height > config.IMAGE.baseMinHeight
        && height < config.IMAGE.baseMaxHeight
      ) {
        baseImage = true;
        return config.IMAGE.baseKey
      }
      return key
    }

    return {
      type: types.image,
      src: url,
      key: getBaseImage()
    }
  });

    if(!baseImage) {
      const minWidth = Math.min(...widthArr);

      const baseImageKey = imagesKeys.find(imageKey => {
        const { width } = images[imageKey];
        baseImage = true;
        return width === minWidth
      });

      result[baseImageKey].key = config.IMAGE.baseKey;
    }
  return result;
}

export function convertDate(date, form) {
  const d = moment(date).toDate();
  return moment(d).format(form);
}

export function createEntry(typeValue, {id, title, content, extensions, metadata, images, media}) {

  /* eslint-disable-next-line camelcase */
  const media_group = images
    ? [
        {
          type: types.image,
           media_item: createMediaItem(images)
        },
      ]
    : undefined;

  return {
    type: {
      value: typeValue
    },
    id,
    title,
    ...metadata,
    media,
    media_group,
    content,
    extensions
  };
}

export function getSeriesIdNumber(id) {
  return id.split('/').pop();
}

export function setRange (url) {
  if (url.includes('&limit=')) {
    const feedUrl = url.slice(0, url.indexOf('&limit'));
    return feedUrl.includes('?') ? url.replace('limit=', 'range=-') : url.replace('&limit=', '?range=-');
  }
  return url
}

export function getPlatform (url) {
  const aUrl = parseUrl(url, true);
  return aUrl.host === config.MPX.MEDIA_BASE_HOST ? 'media' : 'entertainment';
}

export function setFeedResponseForm (url) {
  const aUrl = parseUrl(url, true);
  Object.keys(aUrl.query).forEach(key => {
      if (key === 'form') {
        aUrl.query[key] = 'cjson';
      }
  });

  return format({
    protocol: aUrl.protocol,
    hostname: aUrl.hostname,
    pathname: aUrl.pathname,
    query: aUrl.query
  });
}

export function updateParamsFromUrl(params) {
  const parameters = {...params};
  const { url, type } = parameters;

  try {
    const platform = getPlatform(url);
    const aUrl = parseUrl(url, true);

    config.MPX.URL = `${aUrl.protocol}//${aUrl.host}${aUrl.pathname}`;

    const arr = aUrl.pathname.split('/');
    arr.pop();

    if(type === 'show' && platform !== 'media') {
      arr.pop();
    }

    const path = arr.join('/');

    config.MPX.API_BASE_URL = `${aUrl.protocol}//${aUrl.host}${path}`;

    const queryParams = {...aUrl.query};

    Object.keys(queryParams).forEach(key => {
      if (!parameters[key]) {
        parameters[key] = queryParams[key];
      }
    });

    parameters.platform = platform;
    parameters.url = setFeedResponseForm(url);

    return parameters;
  } catch (err) {
    throw (err)
  }
}

export function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode(`0x${p1}`);
    }));
}

export function createSrc (type, url) {
  const encodedUrl = b64EncodeUnicode(url);
  return `${config.PROVIDER.name}://fetchData?type=${type}&url=${encodedUrl}`;
}

export function getCustomFields(obj) {
  const keys = Object.keys(obj);
  const customKeys = keys.filter(key => key.includes('$'));
  const newObj = {};
  customKeys.forEach(key => {
    const newKey = key.slice(key.indexOf('$') + 1);
    newObj[newKey] = obj[key]
  });
  return newObj;
}

export function getUniqueItems(arr, customFieldObject, field) {

  config.MPX.CUSTOM_FIELD_NAME = Object.keys(customFieldObject)[0];

  const fieldName = `${config.MPX.CUSTOM_FIELD_NAME}$${field}`;

  const filterFieldArr = arr.map(arrItem => arrItem[fieldName]);
  const uniqueFilteredArr = [... new Set(filterFieldArr)];
  return uniqueFilteredArr.map(showTitle => {
    return arr.find(arrItem => arrItem[fieldName] === showTitle);
  });
}

export function byField(field, extraField) {

  const fieldName = `${config.MPX.CUSTOM_FIELD_NAME}$${field}`;
  const extraFieldName = `${config.MPX.CUSTOM_FIELD_NAME}$${extraField}`;

  return (a, b) => {
    switch (true) {
      case (a[fieldName] > b[fieldName]):
        return 1;
      case (a[fieldName] < b[fieldName]):
        return -1;
      case (a[fieldName] === b[fieldName]):

        switch (true) {
          case (a[extraFieldName] > b[extraFieldName]):
            return 1;
          case (a[extraFieldName] < b[extraFieldName]):
            return -1;
          default:
            return 0;
        }

      default:
        return 0;
    }
  }
}