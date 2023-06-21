import { styled } from 'styled-components';
import IComment from '../../../../types/comment';
import { Link } from 'react-router-dom';
import IUser from '../../../../types/user';
import { formatContent, formatDate } from '../../Shared/formattingHelpers';
import IPost from '../../../../types/post';
import { useContext } from 'react';
import { SelectedUserNameContext } from '../../../context/SelectedUserNameContext';

const Container = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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

const StyledDeleted = styled.i`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface Props {
  comment: IComment;
}

const CommentPreview = ({ comment }: Props) => {
  const { content, updatedAt, author: commenter, post, _id } = comment;
  const {
    _id: commenterId,
    firstName: commenterFirstName,
    lastName: commenterLastName,
  } = commenter as IUser;

  const authorName = useContext(SelectedUserNameContext);

  const { _id: postId, title, author: postAuthor } = post as IPost;

  const { firstName: posterFirstName, lastName: posterLastName } = postAuthor as IUser;

  return (
    <Container>
      <StyledDateAuthorDiv>
        {commenterId ? (
          <Link to={`/user/${commenterId}`}>
            {`${commenterFirstName} ${commenterLastName}`}
          </Link>
        ) : (
          <StyledDeleted>{authorName ?? 'Deleted'}</StyledDeleted>
        )}
        <p>•</p>
        <Link to={`/post/${postId}`} state={{ scrollToComment: _id }}>
          {formatDate(updatedAt)}
        </Link>
      </StyledDateAuthorDiv>
      <Link to={`/post/${postId}`} state={{ scrollToComment: _id }}>
        <StyledContent>{formatContent(content)}</StyledContent>
      </Link>
      <StyledPostInfo>
        On post:{' '}
        <Link to={`/post/${postId}`} state={{ scrollToComment: _id }}>
          {title} by {posterFirstName} {posterLastName}
        </Link>
      </StyledPostInfo>
    </Container>
  );
};

export default CommentPreview;
