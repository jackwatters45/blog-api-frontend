import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IPost from '../../../../types/post';
import { styled } from 'styled-components';
import { useUserContext } from '../../../context/UserContext';
import IComment from '../../../../types/comment';
import PostInfo from './PostInfo';
import Profile from '../Profile';
import { PostContentDefault } from '../../../styles/styledComponents/PostContentComponents';
import Loading from '../../shared/Loading';
import CommentsContainer from '../Comments/CommentsContainer';

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

const Post = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);

      if (!res.ok) return navigate('/404');
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id, user, navigate]);

  if (!post) return <Loading />;
  const { content, comments, author } = post;
  return (
    <StyledPostContainer>
      <PostInfo post={post} />
      <PostContentDefault contentHtml={content} />
      {!author?.isDeleted && <Profile user={author} />}
      <CommentsContainer initialComments={comments as IComment[]} />
    </StyledPostContainer>
  );
};

export default Post;
