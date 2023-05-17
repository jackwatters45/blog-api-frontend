import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Nav from './Nav/Nav';

const Dashboard = () => {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <Nav />
      <main></main>
    </div>
  );
};

export default Dashboard;
