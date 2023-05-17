import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import StyledButton from '../../../styles/styledComponents/StyledButton';

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
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </div>
  );
};

export default Logout;
