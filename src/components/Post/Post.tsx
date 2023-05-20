import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IPost from '../../../types/post.d';
import { styled } from 'styled-components';
import { formatDate, getAuthorFullName } from '../../utils/formatPostData';
import { StyledHrHorizontal } from '../../styles/styledComponents/StyledHr';

const StyledPostContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const StyledPostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledH1 = styled.h1`
  font-size: 2.5rem;
`;

const StyledAuthor = styled(Link)`
  font-size: 0.8rem;
  color: grey;
`;

const StyledTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
`;

const BottomRowInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikesAndComments = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.8rem;
  color: {({ theme }) => theme.colors.textSecondary};

  > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Content = styled.p`
  margin: 2rem 0;
`;

const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return null;

  const { title, content, author, tags, createdAt, likes, comments } = post;
  return (
    <StyledPostContainer>
      <StyledPostInfoContainer>
        <StyledH1>{title}</StyledH1>
        <StyledAuthor to={`/users/${id}`}>
          {getAuthorFullName(author)} • {formatDate(createdAt)}
        </StyledAuthor>
        <BottomRowInfo>
          <StyledTags>
            {!!tags?.length && tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
          </StyledTags>
          <LikesAndComments>
            <button>
              <p>💬</p>
              <p>{comments?.length}</p>
            </button>
            <button>
              <p>❤️</p>
              <p>{likes?.length}</p>
            </button>
          </LikesAndComments>
        </BottomRowInfo>
      </StyledPostInfoContainer>
      <StyledHrHorizontal />
      <Content>{content}</Content>
    </StyledPostContainer>
  );
};

export default Post;
