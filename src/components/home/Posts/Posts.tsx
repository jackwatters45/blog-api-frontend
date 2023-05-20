import { styled } from 'styled-components';
import PostPreviews from './PostPreviews';
import { useEffect, useState } from 'react';
import IPost from '../../../../types/post.d';

const StyledPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <StyledPostsContainer>
      {posts.length &&
        posts.map((post: IPost, index) => <PostPreviews key={index} post={post} />)}
    </StyledPostsContainer>
  );
};

export default Posts;
