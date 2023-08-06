import { isNull } from '../is-null';
import { isUndefined } from '../is-undefined';

export function isDefined<T>(value: T | undefined | null): value is T {
  return !isUndefined(value) && !isNull(value);
}
