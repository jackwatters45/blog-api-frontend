import {
  StyledMain,
  StyledContentContainer,
  StyledH1,
  StyledTags,
  StyledTag,
} from '../../styles/styledComponents/TopicComponents';
import Nav from '../Nav/Nav';
import Sidebar from '../Home/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';
import ITopic from '../../../types/topic';
import Posts from '../Posts/Posts';
import { useParams } from 'react-router-dom';
import IPost from '../../../types/post';

const StyledTagSelected = styled(StyledTag)`
  background: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Topics = () => {
  const { id } = useParams();

  const [selectedTopic, setSelectedTopic] = useState<ITopic | undefined>(undefined);
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    if (!id) return setSelectedTopic(undefined);
    const fetchTopic = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/topics/${id}`);
      const data = await res.json();
      const { posts, topic } = data;

      setSelectedTopic(topic);
      setPosts(posts);
    };
    fetchTopic();
  }, [id]);

  const [topics, setTopics] = useState<ITopic[]>([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/topics`);
      const data = await res.json();
      setTopics(data);
    };
    fetchTopics();
  }, []);

  return (
    <>
      <Nav />
      <StyledMain>
        <StyledContentContainer>
          <StyledH1>{selectedTopic ? selectedTopic.name : 'Explore Topics'}</StyledH1>
          <StyledTags>
            {topics.slice(0, 20).map((topic, index) => {
              const { _id, name } = topic;
              return !!id && id === topic._id ? (
                <StyledTagSelected key={index} to={'/explore-topics'}>
                  {name}
                  <Icon path={mdiCloseBox} size={0.8} />
                </StyledTagSelected>
              ) : (
                <StyledTag key={index} to={`/topic/${_id}`}>
                  {name}
                </StyledTag>
              );
            })}
            <Posts postsProp={posts} selectedTopic={selectedTopic} />
          </StyledTags>
        </StyledContentContainer>
        <Sidebar />
      </StyledMain>
    </>
  );
};

export default Topics;
