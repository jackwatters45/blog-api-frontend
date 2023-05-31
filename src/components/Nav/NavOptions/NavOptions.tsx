import { styled } from 'styled-components';
import NavOption from './NavOption';
import { mdiPencilBoxOutline } from '@mdi/js';
import { useUserContext } from '../../../context/UserContext';
import ProfileButton from './Profile/ProfileButton';
import AdminButton from './Admin/AdminButton';

const StyledNavOptions = styled.div`
  display: flex;
  gap: 2vw;
`;

const NavOptions = () => {
  const { user } = useUserContext();

  return (
    <StyledNavOptions>
      {user ? (
        <>
          {user.userType === 'admin' && <AdminButton />}
          <NavOption icon={mdiPencilBoxOutline} text="Write" to="/write" size={0.8} />
          <ProfileButton />
        </>
      ) : (
        <>
          <NavOption icon={mdiPencilBoxOutline} text="Write" to="/signup" size={0.8} />
          <NavOption text="Sign up" to="/signup" />
          <NavOption text="Log in" to="/login" />
        </>
      )}
    </StyledNavOptions>
  );
};

export default NavOptions;
