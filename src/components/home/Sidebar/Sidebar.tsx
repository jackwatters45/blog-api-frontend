import { styled } from 'styled-components';
import PopularAuthors from './PopularAuthors';
import PopularPosts from './PopularPosts';

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 250px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Sidebar = () => {
  return (
    <StyledSidebar className="sidebar">
      <PopularPosts />
      <PopularAuthors />
    </StyledSidebar>
  );
};

export default Sidebar;
