import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import User from './User';

const MyProfile = () => {
  const { user } = useUserContext();

  return !user ? <Navigate to={'/login'} /> : <User userId={user._id} />;
};

export default MyProfile;
