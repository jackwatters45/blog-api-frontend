import { StyledSidebar } from '../../../styles/styledComponents/SidebarComponents';
import PopularAuthors from './PopularAuthorsSidebar';
import PopularPostsSidebar from './PopularPostsSidebar';
import PopularTopics from './PopularTopicsSidebar';

const Sidebar = () => {
  return (
    <StyledSidebar>
      <PopularPostsSidebar />
      <PopularAuthors />
      <PopularTopics />
    </StyledSidebar>
  );
};

export default Sidebar;
