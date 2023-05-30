import {
  StyledMain,
  StyledContentContainer,
  StyledH1,
  PopularTopicsContainer,
  TopicButtonLarge,
} from '../../styles/styledComponents/HelperComponents';
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
import TimeRange from '../shared/TimeRange';
import useTimeRange from '../../custom/useTimeRange';
import useSort from '../../custom/useSort';
import SortBy from '../shared/SortBy';
import { useSidebarContext } from '../../context/SidebarContext';
import { camelToTitleCase } from '../shared/formattingHelpers';

const StyledTopicButton = styled(TopicButtonLarge)`
  background: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const Topics = () => {
  const { id } = useParams();

  const { timeRange, handleSelectRange } = useTimeRange();
  const { sortBy, handleSelectSortBy } = useSort();
  const { topics } = useSidebarContext();

  const [selectedTopic, setSelectedTopic] = useState<ITopic | undefined>(undefined);
  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    if (!id) return setSelectedTopic(undefined);
    const fetchTopic = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/topics/${id}?timeRange=${timeRange}&sortBy=${sortBy}`,
      );
      const data = await res.json();
      const { posts, topic } = data;

      setSelectedTopic(topic);
      setPosts(posts);
    };
    fetchTopic();
  }, [id, timeRange, sortBy]);

  const getFilterResult = () => {
    const selectedTopicData = topics.find((topic) => topic._id === selectedTopic?._id);

    return selectedTopicData ? selectedTopicData[sortBy] : '0';
  };

  return (
    <>
      <Nav />
      <StyledMain>
        <StyledContentContainer>
          <StyledH1>{selectedTopic ? selectedTopic.name : 'Explore Topics'}</StyledH1>
          <PopularTopicsContainer>
            {topics.slice(0, 10).map(({ _id, name }) => {
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
            <FilterContainer>
              <TimeRange timeRange={timeRange} handleSelectRange={handleSelectRange} />
              <SortBy
                label={'Sort Topics By:'}
                sortBy={sortBy}
                handleSelectSortBy={handleSelectSortBy}
              />
              <p>
                {camelToTitleCase(sortBy)}: {getFilterResult()}
              </p>
            </FilterContainer>
          )}
          <Posts postsProp={posts} selectedFilter={!!selectedTopic} />
        </StyledContentContainer>
        <Sidebar />
      </StyledMain>
    </>
  );
};

export default Topics;
