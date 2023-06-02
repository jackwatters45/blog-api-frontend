import {
  StyledMain,
  StyledContentContainer,
  StyledH1,
  PopularTopicsContainer,
  TopicButtonLarge,
} from '../../styles/styledComponents/HelperComponents';
import Sidebar from '../Home/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';
import ITopic from '../../../types/topic';
import Posts from '../Posts/Posts';
import { useParams } from 'react-router-dom';
import IPost from '../../../types/post';
import useTimeRange from '../../custom/useTimeRange';
import { useSidebarContext } from '../../context/SidebarContext';
import PostSort from './PostSort';
import { StyledTopicButton } from '../../styles/styledComponents/TopicComponents';

const Topics = () => {
  const { id } = useParams();

  const { timeRange, handleSelectRange } = useTimeRange();
  const { topics } = useSidebarContext();

  const [selectedTopic, setSelectedTopic] = useState<ITopic | undefined>(undefined);
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    if (!id) return setSelectedTopic(undefined);
    const fetchTopic = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/topics/${id}/posts/?timeRange=${timeRange}`,
      );
      const data = await res.json();
      const { posts, topic } = data;

      setSelectedTopic(topic);
      setPosts(posts);
    };
    fetchTopic();
  }, [id, timeRange]);

  return (
    <StyledMain>
      <StyledContentContainer>
        <StyledH1>{selectedTopic ? selectedTopic.name : 'Explore Topics'}</StyledH1>
        <PopularTopicsContainer>
          {topics.map(({ _id, name }) => {
            return selectedTopic?._id === _id ? (
              <StyledTopicButton key={_id} to={'/explore-topics'}>
                {name}
                <Icon path={mdiCloseBox} size={0.8} />
              </StyledTopicButton>
            ) : (
              <TopicButtonLarge key={_id} to={`/topic/${_id}`}>
                {name}
              </TopicButtonLarge>
            );
          })}
        </PopularTopicsContainer>
        {selectedTopic && (
          <PostSort
            topics={topics}
            selectedTopic={selectedTopic}
            timeRange={timeRange}
            handleSelectRange={handleSelectRange}
          />
        )}
        <Posts postsProp={posts} selectedFilter={!!selectedTopic} />
      </StyledContentContainer>
      <Sidebar />
    </StyledMain>
  );
};

export default Topics;
