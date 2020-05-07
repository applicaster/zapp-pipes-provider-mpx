import * as R from 'ramda';
import { convertDate, createEntry, createSrc, validate } from '../../../utils';
import { types } from '../../../types';

export function mapSeasons(season, BASE_URL, episodesPID, seasonId, seriesUrl) {
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
  } = season;

  const dynamicUrlEpisodes = `${BASE_URL}?byTvSeasonId=${seasonId}&seriesUrl=${seriesUrl}`;

  const content = {
    src: createSrc('season', dynamicUrlEpisodes),
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

  return createEntry(types.feed, {
    id: seriesId,
    title,
    metadata,
    content,
    extensions
  })
}
