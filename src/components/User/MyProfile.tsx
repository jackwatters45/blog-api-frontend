import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import User from './User';

const MyProfile = () => {
  const { user } = useUserContext();

  if (!user) return <Navigate to={'/login'} />;
  return <User userId={user._id} />;
};

export default MyProfile;
