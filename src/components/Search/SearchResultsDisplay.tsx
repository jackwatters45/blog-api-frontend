import { ISearchResults } from '../../../types/utils/search';
import {
  AdminContainer,
  CardContainer,
  FilterError,
} from '../../styles/styledComponents/AdminCardComponents';
import { styled } from 'styled-components';
import { TopicButtonLarge } from '../../styles/styledComponents/HelperComponents';
import PostPreviewCard from '../shared/PostPreviewCard';
import IPost from '../../../types/post';
import EditUserCard from '../Admin/Users/EditUserCard';
import useQuery from '../../custom/useQuery';

const StyledCategoryHeader = styled.h3`
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

interface Props {
  searchResults: ISearchResults;
}

const SearchResultsDisplay = ({ searchResults: { posts, users, topics } }: Props) => {
  const query = useQuery();
  return (
    <AdminContainer>
      <h2>{`Search for '${query}':`}</h2>
      <StyledCategoryHeader>Posts</StyledCategoryHeader>
      <CardContainer>
        {posts?.length ? (
          posts.map((post: IPost) => (
            <PostPreviewCard key={post._id} post={post} isAdminView={false} />
          ))
        ) : (
          <FilterError>No posts match your search...</FilterError>
        )}
      </CardContainer>

      <StyledCategoryHeader>Users</StyledCategoryHeader>
      <CardContainer>
        {users.length ? (
          users.map((user) => {
            return <EditUserCard key={user._id} user={user} isViewOnly={true} />;
          })
        ) : (
          <FilterError>No users matching your search..</FilterError>
        )}
      </CardContainer>
      <StyledCategoryHeader>Topics</StyledCategoryHeader>
      <CardContainer>
        {topics.length ? (
          topics.map((topic) => {
            const { _id, name } = topic;
            return (
              <TopicButtonLarge key={_id} to={`/topic/${_id}`}>
                {name}
              </TopicButtonLarge>
            );
          })
        ) : (
          <FilterError>No topics matching your search..</FilterError>
        )}
      </CardContainer>
    </AdminContainer>
  );
};

export default SearchResultsDisplay;
