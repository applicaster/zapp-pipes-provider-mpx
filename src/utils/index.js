import moment from 'moment/moment';
import {config} from '../config';
import {types} from '../types';

export function createMediaGroupItem(images) {

  if (images === undefined || images === null) {
    return undefined;
  }

  const imagesKeys = Object.keys(images);
  let baseImage = false;

  return imagesKeys.map(imageKey => {

    const {
      width,
      height,
      url
    } = images[imageKey];

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
      media_item: [
        {
          type: types.image,
          src: url,
          key: getBaseImage()

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