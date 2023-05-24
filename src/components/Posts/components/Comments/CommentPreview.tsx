import { styled } from 'styled-components';
import IComment from '../../../../../types/comment';
import { StyledHrHorizontal } from '../../../../styles/styledComponents/StyledHr';
import { Link } from 'react-router-dom';
import IUser from '../../../../../types/user';
import {
  getUserFullName,
  formatContent,
  formatDate,
  getUserId,
} from '../../../../utils/formattingHelpers';
import IPost from '../../../../../types/post';

const Container = styled.div`
  margin: 2rem 0;
`;

const StyledDateAuthorDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const StyledContent = styled.p`
  font-size: 1.2rem;
`;

const StyledPostInfo = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

type Props = {
  comment: IComment;
};

const CommentPreview = ({ comment }: Props) => {
  const { content, updatedAt, author, post } = comment;

  const { _id: postId, title, author: postAuthor } = post as IPost;
  const authorId = getUserId(author);

  return (
    <>
      <Container>
        <StyledDateAuthorDiv>
          {authorId ? (
            <Link to={`/user/${authorId}`}>{getUserFullName(author as IUser)}</Link>
          ) : (
            <p>Unknown</p>
          )}
          <p>•</p>
          <Link to={`/poss/${postId}`}>{formatDate(updatedAt)}</Link>
        </StyledDateAuthorDiv>
        <Link to={`/post/${postId}`}>
          <StyledContent>{formatContent(content)}</StyledContent>
        </Link>
        <StyledPostInfo>
          On post:{' '}
          <Link to={`/post/${postId}`}>
            {title} by {getUserFullName(postAuthor)}
          </Link>
        </StyledPostInfo>
      </Container>
      <StyledHrHorizontal />
    </>
  );
};

export default CommentPreview;
