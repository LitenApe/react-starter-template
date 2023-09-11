import { assert, isNull } from '~/features/common/utility';

import { generatePath } from 'react-router-dom';
import { getPath } from './get-path.utility';
import { routes } from '~/features/navigation/router';

type PathVariables = Parameters<typeof generatePath>['1'];

export function href(alias: string, variables?: PathVariables) {
  const path = getPath(routes, alias);

  assert(!isNull(path), `Unable to find path for [alias=${alias}]`);

  return generatePath(path, variables);
}
