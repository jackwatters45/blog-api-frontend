import { useLocation } from 'react-router-dom';

interface IQuery {
  variable?: string;
}

function useQuery({ variable = 'q' }: IQuery = {}) {
  const query = new URLSearchParams(useLocation().search);
  return query.get(variable);
}

export default useQuery;
