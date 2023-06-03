import ITopic, { PopularTopics } from '../../../types/topic';
import { ChangeEvent, useMemo } from 'react';
import {
  StyledValue,
  TotalValueContainer,
  FilterContainer,
  StyledTimeRange,
} from '../../styles/styledComponents/TopicComponents';

interface Props {
  topics: PopularTopics[];
  timeRange: string;
  selectedTopic?: ITopic;
  handleSelectRange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const PostSort = ({ topics, timeRange, selectedTopic, handleSelectRange }: Props) => {
  const filterResult = useMemo(() => {
    return topics.find((topic) => topic._id === selectedTopic?._id)?.totalLikes ?? '0';
  }, [topics, selectedTopic]);

  return (
    <FilterContainer>
      <StyledTimeRange timeRange={timeRange} handleSelectRange={handleSelectRange} />
      <TotalValueContainer>
        <p>Total Likes: </p>
        <StyledValue>{filterResult}</StyledValue>
      </TotalValueContainer>
    </FilterContainer>
  );
};

export default PostSort;
