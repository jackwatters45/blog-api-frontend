import { useState } from 'react';
import ITopic from '../../../../types/topic';
import {
  AdminContainer,
  CardContainer,
  FilterContainer,
  FilterError,
  StyledCreateLink,
  StyledHeader,
} from '../../../styles/styledComponents/AdminCardComponents';
import Filter from '../../shared/Filter/Filter';
import { topicFilterFunction } from '../../shared/Filter/filterFunctions';
import EditTopicCard from './EditTopicCard';
import Loading from '../../shared/Loading';

interface Props {
  topics: ITopic[];
}

const EditTopics = ({ topics }: Props) => {
  const [filteredTopics, setFilteredTopics] = useState(topics ?? []);

  return filteredTopics ? (
    <AdminContainer>
      <StyledHeader>
        <h1>Edit Topics</h1>
        <StyledCreateLink to={`/admin/topics/create`}>+Create Topic</StyledCreateLink>
      </StyledHeader>
      <FilterContainer>
        <Filter<ITopic>
          data={topics ?? []}
          setFilteredData={setFilteredTopics}
          filterFunction={topicFilterFunction}
          placeHolder={'Filter Topics...'}
        />
      </FilterContainer>
      <CardContainer>
        {filteredTopics?.length ? (
          filteredTopics.map((topic: ITopic) => {
            return <EditTopicCard key={topic._id} topic={topic} />;
          })
        ) : (
          <FilterError>{`No users match your filter...`}</FilterError>
        )}
      </CardContainer>
    </AdminContainer>
  ) : (
    <Loading />
  );
};

export default EditTopics;
