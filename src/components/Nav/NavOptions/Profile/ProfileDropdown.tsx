import { useModal, useModalParams } from 'react-hook-modal-pure';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useUserContext } from '../../../../context/UserContext';
import Cookies from 'js-cookie';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 3px;
  padding: 4px;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 200px;
  font-size: 0.9rem;
  margin-top: 4px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const StyledLi = styled.li`
  padding: 4px;
  border-radius: 3px;
  ${({ theme }) => theme.hoverStyle};
  cursor: pointer;
`;

type Props = {
  useModalParams: useModalParams;
};

const ProfileDropdown = ({ useModalParams }: Props) => {
  const modalProps = useModal(useModalParams);

  const { updateUser, user } = useUserContext();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    updateUser(null);

    // TODO
    // remove session
    // clear cookies
    Object.keys(Cookies.get()).forEach((name) => Cookies.remove(name));

    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
    });

    navigate('/login');
  };

  return (
    <Container {...modalProps}>
      <ul>
        <Link to={`/user/${user?._id}`}>
          <StyledLi>Profile</StyledLi>
        </Link>
        <Link to={`/my-posts`}>
          <StyledLi>Your Posts</StyledLi>
        </Link>
        <Link to={`/user/${user?._id}/settings`}>
          <StyledLi>Settings</StyledLi>
        </Link>
        <StyledLi onClick={handleClickLogout}>Log out</StyledLi>
      </ul>
    </Container>
  );
};

export default ProfileDropdown;
