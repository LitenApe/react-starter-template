import { useParams } from 'react-router-dom';

export function Component() {
  const { userid } = useViewController();

  return <h1>User {userid}</h1>;
}

function useViewController() {
  const { userid } = useParams();

  return {
    userid,
  };
}
