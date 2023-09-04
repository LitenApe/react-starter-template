import { ComponentProps, PropsWithChildren } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { getPathFromAlias } from '~/features/navigation/utility';

type PathArguments = Parameters<typeof getPathFromAlias>;

interface Props {
  to: PathArguments[0];
  variables?: PathArguments[1];
}

export function Link(props: PropsWithChildren<Props>) {
  const { to, children } = useViewController(props);
  return <RouterLink to={to}>{children}</RouterLink>;
}

function useViewController(props: ComponentProps<typeof Link>) {
  const { to, children } = props;
  const path = getPathFromAlias(to);

  return {
    children,
    to: path,
  };
}
