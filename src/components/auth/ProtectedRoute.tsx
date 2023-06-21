import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';

interface Props {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactElement;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/unauthorized',
  children,
}: Props) => {
  const { pathname } = useLocation();

  if (!isAllowed)
    return <Navigate to={redirectPath} state={{ from: pathname }} replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
