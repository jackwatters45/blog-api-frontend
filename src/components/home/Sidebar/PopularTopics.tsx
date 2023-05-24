import {
  SidebarHeader,
  SeeAllLink,
} from '../../../styles/styledComponents/SidebarComponents';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';
import {
  TagSidebar,
  TagsSidebar,
} from '../../../styles/styledComponents/HelperComponents';
import { PopularTopics } from '../../../../types/topic';
import { useSidebarContext } from '../../../context/SidebarContext';

const PopularTopics = () => {
  const { topics } = useSidebarContext();

  return (
    <div>
      <SidebarHeader>Popular Topics</SidebarHeader>
      <StyledHrHorizontal />

      <TagsSidebar>
        {!!topics.length &&
          topics.slice(0, 10).map((topic: PopularTopics, index: number) => {
            const {
              topicDetails: { _id, name },
            } = topic;
            return (
              <TagSidebar key={index} to={`/topic/${_id}`}>
                {name}
              </TagSidebar>
            );
          })}
      </TagsSidebar>

      <SeeAllLink to={`/explore-topics`}>See the full list</SeeAllLink>
    </div>
  );
};

export default PopularTopics;
