import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useErrorHandler = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleErrors = useCallback(
    (res: Response) => {
      switch (res.status) {
        case 401:
          return navigate('/login', { state: { from: pathname } });
        case 403:
          return navigate('/unauthorized', { state: { from: pathname } });
        default:
          return;
      }
    },
    [navigate, pathname],
  );

  return handleErrors;
};

export default useErrorHandler;
