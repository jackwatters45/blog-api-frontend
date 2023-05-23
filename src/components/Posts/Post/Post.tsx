import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IPost from '../../../../types/post';
import { styled } from 'styled-components';
import { formatDate, getUserFullName } from '../../../utils/formattingHelpers';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';
import {
  TagSidebar,
  TagsSidebar,
} from '../../../styles/styledComponents/HelperComponents';
import Nav from '../../Nav/Nav';
import { useUserContext } from '../../../context/UserContext';
import Likes from '../components/Likes';
import useLikes from '../../../utils/custom/useLikes';

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
`;

const Content = styled.p`
  margin: 2rem 0;
`;

// TODO comments (see likes)
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

  const useLikesProps = useLikes(post as IPost, user);

  if (!post) return null;
  const { title, content, author, tags, createdAt, comments } = post;
  return (
    <>
      <Nav />
      <StyledPostContainer>
        <StyledPostInfoContainer>
          <StyledH1>{title}</StyledH1>
          <StyledAuthor to={`/user/${id}`}>
            {getUserFullName(author)} • {formatDate(createdAt)}
          </StyledAuthor>
          <BottomRowInfo>
            <TagsSidebar>
              {/* TODO tags crap */}
              {!!tags?.length &&
                tags.map((tag, index) => (
                  <TagSidebar key={index} to={''}>
                    {tag}
                  </TagSidebar>
                ))}
            </TagsSidebar>
            <LikesAndComments>
              <button>
                <p>💬</p>
                <p>{comments?.length}</p>
              </button>
              <Likes {...useLikesProps} />
            </LikesAndComments>
          </BottomRowInfo>
        </StyledPostInfoContainer>
        <StyledHrHorizontal />
        <Content>{content}</Content>
      </StyledPostContainer>
    </>
  );
};

export default Post;
