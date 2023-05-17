import { styled } from 'styled-components';
import NavOption from './NavOption';
import { mdiAccountHardHat, mdiPencilBoxOutline } from '@mdi/js';
import { useUserContext } from '../../context/UserContext';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';

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
  margin-bottom: 5px;
`;

const StyledNavOptions = styled.div`
  display: flex;
  gap: 2vw;
`;

const StyledHr = styled.hr`
  height: 0.5px;
  border: none;
  background-color: ;
`;

const Nav = () => {
  const { user } = useUserContext();
  return (
    <>
      <StyledNav>
        <StyledH1>Home</StyledH1>
        <SearchBar />
        {/* Make own component below */}
        <StyledNavOptions>
          {user ? (
            <>
              {user.userType === 'admin' && (
                <NavOption icon={mdiAccountHardHat} text="Admin" size={0.9} />
              )}
              <NavOption icon={mdiPencilBoxOutline} text="Write" size={0.9} />
              <ProfileDropdown />
            </>
          ) : (
            ''
          )}
        </StyledNavOptions>
        {/* <Logout /> */}
      </StyledNav>
      <StyledHr />
    </>
  );
};

export default Nav;
