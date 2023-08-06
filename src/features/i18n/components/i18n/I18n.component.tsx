import { ComponentProps, ComponentPropsWithoutRef, ElementType } from 'react';

import { useTranslations } from '~/features/i18n/hooks';

type AsProps<T extends ElementType> = {
  as?: T;
};

type DynamicProps<T extends ElementType> = AsProps<T> &
  ComponentPropsWithoutRef<T>;

type Props = {
  text: string;
};

export function I18n<T extends ElementType>(props: Props & DynamicProps<T>) {
  const { translation, As, ...htmlProps } = useViewController(props);
  return <As {...htmlProps}>{translation}</As>;
}

function useViewController(props: ComponentProps<typeof I18n>) {
  const { text, as = 'span', ...htmlProps } = props;
  const { getText } = useTranslations();
  const translation = getText(text);

  return {
    translation,
    As: as,
    ...htmlProps,
  };
}
