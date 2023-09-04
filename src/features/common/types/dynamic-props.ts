import type { ComponentPropsWithoutRef, ElementType } from 'react';

interface AsProps<T extends ElementType> {
  as?: T;
}

export type DynamicProps<T extends ElementType> = AsProps<T> &
  ComponentPropsWithoutRef<T>;
