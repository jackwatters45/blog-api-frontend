import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useUserContext } from '../../context/UserContext';

const Logout = () => {
  const navigate = useNavigate();

  const { updateUser } = useUserContext();

  const handleLogout = async () => {
    // clear user from state

    updateUser(null);

    // TODO
    // remove session

    // clear cookies
    Object.keys(Cookies.get()).forEach((name) => Cookies.remove(name));

    // fetch logout endpoint
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
    });

    // Redirect somewhere
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
