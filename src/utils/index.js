import moment from 'moment/moment';
import btoa from 'btoa';
import { config } from '../config';
import { types } from '../types';

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
