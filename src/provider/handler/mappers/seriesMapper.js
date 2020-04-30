import * as R from 'ramda';
import { convertDate, createEntry, createSrc, getSeriesIdNumber, validate } from '../../../utils';
import { types } from '../../../types';


export function mapSeries(series, BASE_URL, episodesPID) {
  const {
    id,
    title = '',
    updated: updatedAt = '',
    pubDate: publishedAt = '',
    description: summary = '',
    credits: creditsArr = [],
    tags = [],
    distributionRightIds: distributionIds = [],
    guid = '',
    thumbnails: images = {}
  } = series;

  const seriesIdNumber = getSeriesIdNumber(id);
  const dynamicUrl = `${BASE_URL}/${seriesIdNumber}?fields=seriesTvSeasons&episodesPID=${episodesPID}`;

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

  const genre = validate(R.filter(R.propEq('scheme', 'Genre'))(tags));
  const distributionRightIds = validate(distributionIds);
  const credits = validate(creditsArr);

  const content = {
    src: createSrc('seasons', dynamicUrl)
  };

  const metadata = {
    published,
    updated,
    summary
  };

  const extensions = {
    alternate_id: guid,
    distributionRightIds,
    genre,
    credits
  };

  return createEntry(types.feed, {
    id,
    title,
    metadata,
    content,
    images: validate(images),
    extensions
  });
}
