import { styled } from 'styled-components';
import NavOption from './NavOption';
import { mdiAccountHardHat, mdiPencilBoxOutline } from '@mdi/js';
import { useUserContext } from '../../../context/UserContext';
import ProfileButton from './ProfileButton';

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
          {user.userType === 'admin' && (
            <NavOption icon={mdiAccountHardHat} text="Admin" to="/admin" size={0.8} />
          )}
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
