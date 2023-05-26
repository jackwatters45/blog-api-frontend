import { styled } from 'styled-components';
import PopularAuthors from './PopularAuthorsSidebar';
import PopularPostsSidebar from './PopularPostsSidebar';
import PopularTopics from './PopularTopicsSidebar';

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 250px;
  width: 300px;
  margin: 2rem 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar className="sidebar">
      <PopularPostsSidebar />
      <PopularAuthors />
      <PopularTopics />
    </StyledSidebar>
  );
};

export default Sidebar;
