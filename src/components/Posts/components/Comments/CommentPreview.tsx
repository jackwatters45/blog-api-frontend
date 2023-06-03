import { styled } from 'styled-components';
import IComment from '../../../../../types/comment';
import { StyledHrHorizontal } from '../../../../styles/styledComponents/theme';
import { Link } from 'react-router-dom';
import IUser from '../../../../../types/user';
import { formatContent, formatDate } from '../../../shared/formattingHelpers';
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

interface Props {
  comment: IComment;
}

const CommentPreview = ({ comment }: Props) => {
  const { content, updatedAt, author: commenter, post } = comment;
  const {
    _id: commenterId,
    firstName: commenterFirstName,
    lastName: commenterLastName,
  } = commenter as IUser;

  const { _id: postId, title, author: postAuthor } = post as IPost;

  const { firstName: posterFirstName, lastName: posterLastName } = postAuthor as IUser;

  return (
    <>
      <Container>
        <StyledDateAuthorDiv>
          {commenterId ? (
            <Link to={`/user/${commenterId}`}>
              {commenterFirstName} {commenterLastName}
            </Link>
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
            {title} by {posterFirstName} {posterLastName}
          </Link>
        </StyledPostInfo>
      </Container>
      <StyledHrHorizontal />
    </>
  );
};

export default CommentPreview;
