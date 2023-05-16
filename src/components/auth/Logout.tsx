import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
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

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
