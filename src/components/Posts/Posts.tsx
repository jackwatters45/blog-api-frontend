import { styled } from 'styled-components';
import PostPreviews from './PostPreviews';
import IPost from '../../../types/post';

const StyledPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  min-width: 280px;
`;

const StyledNoPostsMessage = styled.p`
  margin: 2rem 0;
  font-size: 2rem;
  text-align: center;
`;

interface Props {
  posts: IPost[];
}

const Posts = ({ posts }: Props) => {
  return (
    <StyledPostsContainer>
      {posts?.length ? (
        posts.map((post: IPost) => <PostPreviews key={post._id} post={post} />)
      ) : (
        <StyledNoPostsMessage>{`No posts here yet..`}</StyledNoPostsMessage>
      )}
    </StyledPostsContainer>
  );
};

export default Posts;
