import { useNavigate as useReactRouterNavigate } from 'react-router-dom';
import { href } from '~/features/navigation/utility';

export function useNavigate() {
  const navigate = useReactRouterNavigate();
  
  function go(alias: string, params: Record<string, unknown>) {
    const path = href(alias, params);
    navigate(path);
  }

  return go
}
