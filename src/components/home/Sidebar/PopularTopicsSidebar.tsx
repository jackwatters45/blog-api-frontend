import {
  SidebarHeader,
  SeeAllLink,
  SidebarContainer,
} from '../../../styles/styledComponents/SidebarComponents';
import { StyledHrHorizontal } from '../../../styles/styledComponents/theme';
import {
  SidebarTopicsContainer,
  TopicButton,
} from '../../../styles/styledComponents/HelperComponents';
import { useSidebarContext } from '../../../context/SidebarContext';

const PopularTopicsSidebar = () => {
  const { topics } = useSidebarContext();

  return (
    <SidebarContainer>
      <SidebarHeader>Popular Topics</SidebarHeader>
      <StyledHrHorizontal />
      <SidebarTopicsContainer>
        {!!topics.length &&
          topics.slice(0, 10).map(({ _id, name }) => {
            return (
              <TopicButton key={_id} to={`/topic/${_id}`}>
                {name}
              </TopicButton>
            );
          })}
      </SidebarTopicsContainer>
      <SeeAllLink to={`/explore-topics`}>See the full list</SeeAllLink>
    </SidebarContainer>
  );
};

export default PopularTopicsSidebar;
