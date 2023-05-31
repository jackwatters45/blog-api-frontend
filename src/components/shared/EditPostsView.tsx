import { StyledMain } from '../../styles/styledComponents/HelperComponents';
import EditPostCard from '../Posts/MyPosts/MyPostsCard';
import { styled } from 'styled-components';
import IPost from '../../../types/post';
import Filter from './Filter/Filter';
import { useCallback, useState } from 'react';
import IUser from '../../../types/user';
import { PostFilterOptions } from './Filter/filterOptions';
import { FilterError } from '../../styles/styledComponents/AdminCard';

const MyPostsMain = styled(StyledMain)`
  max-width: 1250px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const FilterContainer = styled.div`
  padding-right: 1rem;
`;

const StyledPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

type Props = {
  posts: IPost[];
  title: string;
  isAdminView?: boolean;
};

const EditPostsView = ({ posts, title, isAdminView }: Props) => {
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

  const filterFunction = useCallback(
    (filter: string, filterType: string, postsData: IPost[]) => {
      switch (filterType) {
        case 'title':
          return postsData.filter((post: { title: string }) =>
            post.title.toLowerCase().includes(filter),
          );
          break;
        case 'author':
          return postsData.filter(
            (post: { author: Partial<IUser> }) =>
              (post?.author.firstName &&
                post.author.firstName.toLowerCase().includes(filter)) ||
              (post?.author.lastName &&
                post.author.lastName.toLowerCase().includes(filter)),
          );
          break;
        case 'topic':
          return postsData.filter(
            (post: IPost) =>
              post?.topic && post.topic.name.toLowerCase().includes(filter),
          );
          break;
        default:
          return postsData.filter(
            (post: IPost) =>
              post.title.toLowerCase().includes(filter) ||
              (post?.author?.firstName &&
                post.author.firstName.toLowerCase().includes(filter)) ||
              (post?.author?.lastName &&
                post.author.lastName.toLowerCase().includes(filter)) ||
              (post?.topic && post.topic.name.toLowerCase().includes(filter)),
          );
      }
    },
    [],
  );

  return (
    <MyPostsMain>
      <Container>
        <h1>{title}</h1>
        <FilterContainer>
          <Filter<IPost>
            data={posts}
            setFilteredData={setFilteredPosts}
            filterFunction={filterFunction}
            filterOptions={PostFilterOptions(isAdminView ?? false)}
          />
        </FilterContainer>
        <StyledPosts>
          {filteredPosts?.length ? (
            filteredPosts.map((post: IPost) => {
              return (
                <EditPostCard key={post._id} post={post} isAdminView={isAdminView} />
              );
            })
          ) : (
            <FilterError>{`No posts match your filter..`}</FilterError>
          )}
        </StyledPosts>
      </Container>
    </MyPostsMain>
  );
};

export default EditPostsView;
