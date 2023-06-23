import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useCallback } from 'react';

const useLogout = () => {
  const { updateUser } = useUserContext();

  const navigate = useNavigate();

  const logout = useCallback(async () => {
    updateUser(undefined);

    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  }, [updateUser]);

  const handleClickLogout = useCallback(async () => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return { logout, handleClickLogout };
};

export default useLogout;
