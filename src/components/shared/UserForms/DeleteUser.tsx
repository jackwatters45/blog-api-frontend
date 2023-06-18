import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import useLogout from '../../Auth/Logout';
import {
  DangerText,
  DeleteUserContainer,
  StyledDeleteAccountButton,
} from '../../../styles/styledComponents/FormHelpers';
import useErrorHandler from '../../Errors/useErrorHandler';

interface Props {
  userId: string;
  isOwnProfile?: boolean;
}

const DeleteUserSection = ({ userId, isOwnProfile }: Props) => {
  const { logout } = useLogout();
  const handleErrors = useErrorHandler();

  const navigate = useNavigate();
  const deleteUser = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/delete`, {
      method: 'PATCH',
      credentials: 'include',
    });

    if (!res.ok) {
      handleErrors(res);
      return;
    }

    if (isOwnProfile) {
      logout();
      return navigate('/');
    }
    return navigate('/admin/users');
  }, [navigate, userId, logout, isOwnProfile, handleErrors]);

  return (
    <DeleteUserContainer>
      <DangerText>Danger Zone</DangerText>
      <StyledDeleteAccountButton
        type="button"
        value={'Delete User'}
        onClick={deleteUser}
      />
    </DeleteUserContainer>
  );
};

export default DeleteUserSection;
