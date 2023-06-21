import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import User from './User';

const MyProfile = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  return !user ? (
    <Navigate to={'/login'} state={{ from: pathname }} />
  ) : (
    <User userId={user._id} />
  );
};

export default MyProfile;
