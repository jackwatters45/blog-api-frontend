import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IPost from '../../../../types/post';
import { styled } from 'styled-components';
import Nav from '../../Nav/Nav';
import { useUserContext } from '../../../context/UserContext';
import IComment from '../../../../types/comment';
import CommentsSection from '../components/Comments/CommentsSection';
import PostInfo from './PostInfo';
import Profile from '../components/Profile';

const StyledPostContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 50px;

  @media (max-width: 640px) {
    padding: 3rem 25px;
  }
`;

const Content = styled.p`
  margin: 2rem 0;
`;

const Post = () => {
  const { id } = useParams();

  const { user } = useUserContext();

  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id, user]);

  if (!post) return <p>Loading</p>;
  const { content, comments, author, _id } = post;
  return (
    <>
      <Nav />
      <StyledPostContainer>
        <PostInfo post={post} />
        <Content>{content}</Content>
        {author && <Profile author={author} />}
        <CommentsSection comments={comments as IComment[]} postId={_id} />
      </StyledPostContainer>
    </>
  );
};

export default Post;
