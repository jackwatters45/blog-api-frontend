import { styled } from 'styled-components';
import PostPreviews from '../Previews/PostPreviews';
import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import ITopic from '../../../types/topic';

const StyledPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  min-width: 400px;
`;

const StyledNoPostsMessage = styled.p`
  margin: 2rem 0;
  font-size: 2rem;
  text-align: center;
`;

interface Props {
  postsProp?: IPost[];
  selectedTopic?: ITopic;
}

const Posts = ({ postsProp, selectedTopic }: Props) => {
  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);

  useEffect(() => {
    if (selectedTopic) return setPosts(postsProp);
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [selectedTopic, postsProp]);

  return (
    <StyledPostsContainer>
      {posts?.length ? (
        posts.map((post: IPost, index) => <PostPreviews key={index} post={post} />)
      ) : (
        <StyledNoPostsMessage>{`No posts here yet..`}</StyledNoPostsMessage>
      )}
    </StyledPostsContainer>
  );
};

export default Posts;
