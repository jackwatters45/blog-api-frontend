import { styled } from 'styled-components';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { StyledHrHorizontal } from '../../styles/styledComponents/theme';
import NavOptions from './NavOptions/NavOptions';

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
  gap: 4vw;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledH1 = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 4px;
  cursor: pointer;
`;

const Nav = () => {
  return (
    <>
      <StyledNav>
        <Link to="/">
          <StyledH1>SCHMEDIUM</StyledH1>
        </Link>
        <SearchBar />
        <NavOptions />
      </StyledNav>
      <StyledHrHorizontal />
    </>
  );
};

export default Nav;
