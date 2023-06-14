import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import useLogout from '../../Auth/Logout';
import {
  DangerText,
  DeleteUserContainer,
  StyledDeleteAccountButton,
} from '../../../styles/styledComponents/FormHelpers';

interface Props {
  userId: string;
  isOwnProfile?: boolean;
}

const DeleteUserSection = ({ userId, isOwnProfile }: Props) => {
  const { logout } = useLogout();

  const navigate = useNavigate();
  const deleteUser = useCallback(async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/delete`, {
      method: 'PATCH',
      credentials: 'include',
    });

    if (isOwnProfile) {
      logout();
      return navigate('/');
    }
    return navigate('/admin/users');
  }, [navigate, userId, logout, isOwnProfile]);

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
