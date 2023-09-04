export function replaceTranslationVariables(
  translation: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Record<string, any> | undefined = {},
) {
  const keys = Object.keys(variables);

  return keys.reduce((acc, key) => {
    const re = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return acc.replace(re, `${variables[key]}`);
  }, translation);
}
