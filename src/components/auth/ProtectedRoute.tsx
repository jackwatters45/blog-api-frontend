import { Navigate, Outlet } from 'react-router-dom';
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
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
