import { ComponentProps } from 'react';
import type { DynamicProps } from '~/features/common/types';
import type { ElementType } from 'react';
import { useTranslations } from '~/features/i18n/hooks';

type TranslationArguments = Parameters<
  ReturnType<typeof useTranslations>['getText']
>;

interface Props {
  text: TranslationArguments[0];
  variables?: TranslationArguments[1];
}

export function I18n<T extends ElementType>(props: Props & DynamicProps<T>) {
  const { translation, As, ...htmlProps } = useViewController(props);
  return <As {...htmlProps}>{translation}</As>;
}

function useViewController(props: ComponentProps<typeof I18n>) {
  const { text, variables, as = 'span', ...htmlProps } = props;
  const { getText } = useTranslations();
  const translation = getText(text, variables);

  return {
    translation,
    As: as,
    ...htmlProps,
  };
}
