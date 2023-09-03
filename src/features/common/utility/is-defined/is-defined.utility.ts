import { isNull, isUndefined } from '~/features/common/utility';

export function isDefined<T>(value: T | undefined | null): value is T {
  return !isUndefined(value) && !isNull(value);
}
