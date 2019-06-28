import moment from 'moment/moment';
import {parse as urlparse} from 'url';
import {config} from '../config';
import {types} from '../types';

export function createMediaGroupItem(images) {

  if (images === undefined || images === null) {
    return undefined;
  }

  const imagesKeys = Object.keys(images);

  return imagesKeys.map(imageKey => {

    const {
      width,
      height,
      url
    } = images[imageKey];

    const key = `image_${width}_x_${height}`;

    return {
      type: types.image,
      media_item: [
        {
          type: types.image,
          src: url,
          key:
            width === config.IMAGE.baseWidth
            && height === config.IMAGE.baseHeight
              ? config.IMAGE.baseKey
              : key
        }
      ]
    };
  })
}

export function convertDate(date, format) {
  const d = moment(date).toDate();
  return moment(d).format(format);
}

export function createEntry(typeValue, {id, title, extensions, metadata, images, media}) {

  /* eslint-disable-next-line camelcase */
  const media_group = createMediaGroupItem(images);

  return {
    type: {
      value: typeValue
    },
    id,
    title,
    ...metadata,
    media,
    extensions,
    media_group
  };
}

export function getUrlParams(params) {
  const {url = ''} = params;
  try {
    const aUrl = urlparse(url, true);
    const arr = aUrl.pathname.split('/');

    const id = arr.pop();
    const path = arr.join('/');

    config.MPX.API_BASE_URL = `${aUrl.protocol}//${aUrl.host}${path}`;
    return id;

  } catch (err) {
    throw err;
  }
}