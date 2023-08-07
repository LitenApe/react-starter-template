import { getPath } from './get-path.utility';
import { isNull } from '~/features/common/utility';
import { routes } from '~/features/navigation/router';

export function getPathFromAlias(alias: string) {
  const path = getPath(routes, alias);

  if (isNull(path)) {
    throw new Error(`Unable to find path for [alias=${alias}]`);
  }

  return path;
}
