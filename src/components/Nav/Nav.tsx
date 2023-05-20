import { styled } from 'styled-components';
import NavOption from './NavOption';
import { mdiAccountHardHat, mdiPencilBoxOutline } from '@mdi/js';
import { useUserContext } from '../../context/UserContext';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { StyledHrHorizontal } from '../../styles/styledComponents/StyledHr';

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
  gap: 4vw;
`;

const StyledH1 = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 4px;
  cursor: pointer;
`;

const StyledNavOptions = styled.div`
  display: flex;
  gap: 2vw;
`;

// TODO profile dropdown (make dropdown hook npm package)
const Nav = () => {
  const { user } = useUserContext();

  return (
    <>
      <StyledNav>
        <Link to="/">
          <StyledH1>SCHMEDIUM</StyledH1>
        </Link>
        <SearchBar />
        {/* Make own component below */}
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
              <NavOption
                icon={mdiPencilBoxOutline}
                text="Write"
                to="/signup"
                size={0.8}
              />
              <NavOption text="Sign up" to="/signup" />
              <NavOption text="Log in" to="/login" />
            </>
          )}
        </StyledNavOptions>
      </StyledNav>
      <StyledHrHorizontal />
    </>
  );
};

export default Nav;
