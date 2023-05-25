import { styled } from 'styled-components';
import IPost, { ILike } from '../../../types/post';
import { StyledHrHorizontal } from '../../styles/styledComponents/theme';
import { formatContent, formatDate } from '../shared/formattingHelpers';
import { Link } from 'react-router-dom';
import Likes from '../shared/Likes';
import { useUserContext } from '../../context/UserContext';
import useLikes from '../../custom/useLikes';
import CommentsButton from './components/Comments/CommentsButton';

const Container = styled.div`
  margin: 2rem 0;
`;

const StyledDateAuthorDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const StyledH2 = styled.h2`
  font-size: 1.8rem;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 2rem;
`;

const LikesAndComments = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.8rem;
`;

const StyledTagsSection = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const StyledTags = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const StyledTag = styled.li`
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

type Props = {
  post: IPost;
};

const PostPreview = ({
  post: { title, content, createdAt, author, _id, tags, likes, comments },
}: Props) => {
  const { user } = useUserContext();

  const useLikesProps = useLikes(likes as ILike[], user?._id);

  const authorId = author?._id;
  const firstName = author?.firstName;
  const lastName = author?.lastName;

  return (
    <>
      <Container>
        <StyledDateAuthorDiv>
          {authorId ? (
            <Link to={`/user/${authorId}`}>
              {firstName} {lastName}
            </Link>
          ) : (
            <p>Unknown</p>
          )}
          <p>•</p>
          <Link to={`/post/${_id}`}>{formatDate(createdAt)}</Link>
        </StyledDateAuthorDiv>
        <Link to={`/post/${_id}`}>
          <StyledH2>{title}</StyledH2>
        </Link>
        <Link to={`/post/${_id}`}>
          <p>{formatContent(content)}</p>
        </Link>
        <BottomRow>
          <LikesAndComments>
            <CommentsButton commentsCount={comments?.length as number} />
            <Likes {...useLikesProps} _id={_id} />
          </LikesAndComments>

          {!!tags?.length && (
            <StyledTagsSection>
              <Link to={`/post/${_id}`}>
                <StyledTags>
                  {tags.map((tag, index) => (
                    <StyledTag key={index}>{tag}</StyledTag>
                  ))}
                </StyledTags>
              </Link>
            </StyledTagsSection>
          )}
        </BottomRow>
      </Container>
      <StyledHrHorizontal />
    </>
  );
};

export default PostPreview;
