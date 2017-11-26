import { SearchRequest } from '../../redux/modules/search/search';

export const request = (payload: SearchRequest): string => {
  const props = Object.keys(payload);

  return props.reduce((acc, prop, i) =>
    !payload[prop] ? acc : `${acc}${prop}=${payload[prop]}&`, '')
    .slice(0, -1);
};
