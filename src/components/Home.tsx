import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Logout from './auth/Logout';

const Home = () => {
  const { user } = useUserContext();

  return !user ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <h1>
        Welcome back {user.firstName} {user.lastName}
      </h1>
      <Logout />
    </div>
  );
};

export default Home;
