import * as R from 'ramda';
import { convertDate, createEntry, createSrc, validate } from '../../../utils';
import { types } from '../../../types';

export function mapShow(show, BASE_URL, episodesPID, seasonId, url) {
  const {
    id: seriesId,
    title = '',
    updated: updatedAt = '',
    pubDate: publishedAt = '',
    description: summary = '',
    credits: creditsArr = [],
    tags = [],
    distributionRightIds: distributionIds = [],
    guid = ''
  } = show;

  const dynamicUrlEpisodes = `${BASE_URL}?byTvSeasonId=${seasonId}`;
  const dynamicUrlSeries = url;

  const content = {
    src: createSrc('episodes', dynamicUrlEpisodes),
  };

  const published = convertDate(publishedAt);
  const updated = convertDate(updatedAt);

  const genre = validate(R.filter(R.propEq('scheme', 'Genre'))(tags));
  const distributionRightIds = validate(distributionIds);
  const credits = validate(creditsArr);

  const metadata = {
    published,
    updated,
    summary,
  };

  const extensions = {
    alternate_id: guid,
    distributionRightIds,
    genre,
    credits
  };

  return  [
    createEntry(types.feed, {
      id: seriesId,
      title,
      metadata,
      content: {
        src: createSrc('series', dynamicUrlSeries),
      },
      extensions
    }),
    createEntry(types.feed, {
      content
    })
  ]
}
