import { styled } from 'styled-components';
import PostPreviews from './PostPreviews';
import { useEffect, useState } from 'react';
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
  postsProp?: IPost[];
  selectedFilter?: boolean;
}

const Posts = ({ postsProp, selectedFilter }: Props) => {
  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);

  useEffect(() => {
    if (selectedFilter) return setPosts(postsProp);
    const fetchPostsNew = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPostsNew();
  }, [selectedFilter, postsProp]);

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
