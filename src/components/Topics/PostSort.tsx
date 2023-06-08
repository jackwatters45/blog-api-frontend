import ITopic, { PopularTopics } from '../../../types/topic';
import { FC, useMemo } from 'react';
import {
  StyledValue,
  TotalValueContainer,
  FilterContainer,
} from '../../styles/styledComponents/TopicComponents';
import {
  SelectProps,
  getItemsPerPageOptions,
  timeRangeOptions,
} from '../../custom/useSelect';

interface Props {
  topics: PopularTopics[];
  selectedTopic?: ITopic;
  TimeRangeSelect: FC<SelectProps>;
  ItemsPerPageSelect: FC<SelectProps>;
}

const PostSort = ({
  topics,
  selectedTopic,
  TimeRangeSelect,
  ItemsPerPageSelect,
}: Props) => {
  const filterResult = useMemo(() => {
    return topics.find((topic) => topic._id === selectedTopic?._id)?.totalLikes ?? '0';
  }, [topics, selectedTopic]);

  return (
    <FilterContainer>
      <TimeRangeSelect {...timeRangeOptions} />
      <ItemsPerPageSelect {...getItemsPerPageOptions('Post')} />
      <TotalValueContainer>
        <p>Total Likes: </p>
        <StyledValue>{filterResult}</StyledValue>
      </TotalValueContainer>
    </FilterContainer>
  );
};

export default PostSort;
