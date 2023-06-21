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
import useSelect from '../../custom/useSelect';
import { useSidebarContext } from '../../context/SidebarContext';
import PostSort from './PostSort';
import { StyledTopicButton } from '../../styles/styledComponents/TopicComponents';
import { usePagination, Pagination } from '../../custom/usePagination';
import { styled } from 'styled-components';
import Loading from '../Shared/Loading';
import useErrorHandler from '../../custom/useErrorHandler';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Topics = () => {
  const { id } = useParams();
  const { topics } = useSidebarContext();
  const handleErrors = useErrorHandler();

  const [timeRange, TimeRangeSelect] = useSelect('lastWeek');
  const [selectedTopic, setSelectedTopic] = useState<ITopic | undefined>(undefined);

  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  const [postCount, setPostCount] = useState<number>(0);

  const [itemsPerPage, ItemsPerPageSelect] = useSelect('10');
  const { offset, ...paginationProps } = usePagination(itemsPerPage, postCount);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/posts/?timeRange=${timeRange}&limit=${itemsPerPage}&offset=${offset}`,
      );

      if (!res.ok) {
        handleErrors(res);
        return;
      }

      const {
        posts,
        meta: { total },
      } = await res.json();
      setPosts(posts);
      setPostCount(total);
    };

    const fetchTopic = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/topics/${id}/posts/?timeRange=${timeRange}&limit=${itemsPerPage}&offset=${offset}`,
      );

      if (!res.ok) {
        handleErrors(res);
        return;
      }

      const {
        posts,
        topic,
        meta: { total },
      } = await res.json();
      setSelectedTopic(topic);
      setPosts(posts);
      setPostCount(total);
    };

    if (id) fetchTopic();
    else fetchPosts();
  }, [id, timeRange, itemsPerPage, offset, handleErrors]);

  return posts ? (
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
            TimeRangeSelect={TimeRangeSelect}
            ItemsPerPageSelect={ItemsPerPageSelect}
          />
        )}
        <PostsContainer>
          <Posts posts={posts} />
          <Pagination {...paginationProps} />
        </PostsContainer>
      </StyledContentContainer>
      <Sidebar />
    </StyledMain>
  ) : (
    <Loading />
  );
};

export default Topics;
