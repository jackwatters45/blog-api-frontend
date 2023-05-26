import {
  SidebarHeader,
  SeeAllLink,
  SidebarContainer,
} from '../../../styles/styledComponents/SidebarComponents';
import { StyledHrHorizontal } from '../../../styles/styledComponents/theme';
import {
  TagSidebar,
  TagsSidebar,
} from '../../../styles/styledComponents/HelperComponents';
import { useSidebarContext } from '../../../context/SidebarContext';

const PopularTopicsSidebar = () => {
  const { topics } = useSidebarContext();

  return (
    <SidebarContainer>
      <SidebarHeader>Popular Topics</SidebarHeader>
      <StyledHrHorizontal />
      <TagsSidebar>
        {!!topics.length &&
          topics.slice(0, 10).map((topic, index: number) => {
            const { _id, name } = topic;
            return (
              <TagSidebar key={index} to={`/topic/${_id}`}>
                {name}
              </TagSidebar>
            );
          })}
      </TagsSidebar>
      <SeeAllLink to={`/explore-topics`}>See the full list</SeeAllLink>
    </SidebarContainer>
  );
};

export default PopularTopicsSidebar;
