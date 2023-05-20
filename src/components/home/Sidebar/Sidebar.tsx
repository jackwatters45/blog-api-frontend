import { styled } from 'styled-components';
import PopularAuthors from './PopularAuthors';
import PopularPosts from './PopularPosts';

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 350px;
`;
const Sidebar = () => {
  return (
    <StyledSidebar>
      <PopularPosts />
      <PopularAuthors />
    </StyledSidebar>
  );
};

export default Sidebar;
