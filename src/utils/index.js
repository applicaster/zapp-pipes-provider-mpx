import moment from "moment/moment";
import {config} from "../config";
import {types} from "../types";

export function createMediaGroupItem(images) {

  if (images === undefined || images === null) {
    return undefined;
  }
  const imagesKeys = Object.keys(images);

  return imagesKeys.map(imageKey => {

    const width = images[imageKey]['width'];
    const height = images[imageKey]['height'];
    const key = `image_${width}_x_${height}`;

    return {
      type: types.image,
      media_item: [
        {
          type: types.image,
          src: images[imageKey]['url'],
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