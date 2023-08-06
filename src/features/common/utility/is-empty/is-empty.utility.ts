export function isEmpty(value: unknown) {
  if (value === null) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  throw new Error(`Supplied [value=${value}] is not supported by 'isEmpty'`);
}
