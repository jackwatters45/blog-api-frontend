import { styled } from 'styled-components';
import PopularAuthors from './PopularAuthors';
import PopularPosts from './PopularPosts';
import PopularTopics from './PopularTopics';

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 250px;
  margin: 2rem 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Sidebar = () => {
  return (
    <StyledSidebar className="sidebar">
      <PopularPosts />
      <PopularAuthors />
      <PopularTopics />
    </StyledSidebar>
  );
};

export default Sidebar;
