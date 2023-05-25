import { styled } from 'styled-components';
import IComment from '../../../../../types/comment';
import { StyledHrHorizontal } from '../../../../styles/styledComponents/theme';
import AddComment from './AddComment';
import { useState } from 'react';
import { formatDate } from '../../../../utils/formattingHelpers';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
`;

const StyledCommentImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-top: 0.5rem;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: 0.9rem;
`;

const StyledDate = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledCommentContent = styled.p`
  font-size: 0.9rem;
`;

type Props = {
  comments: IComment[] | undefined;
  postId: string;
};

const CommentsSection = ({ comments: initialComments, postId }: Props) => {
  const [comments, setComments] = useState<IComment[] | undefined>(initialComments);

  const img = 'https://via.placeholder.com/100';

  return (
    <>
      <StyledHrHorizontal />
      <Container>
        <h2>Comments ({comments?.length ?? 0})</h2>
        <AddComment setComments={setComments} postId={postId} />
        {comments?.map(({ content, updatedAt, author, _id }) => {
          const { firstName, lastName, _id: authorId } = author;
          return (
            <CommentContainer key={_id}>
              <Link to={`/user/${authorId}`}>
                <StyledCommentImg src={img} alt="user icon" />
              </Link>
              <CommentInfo>
                <StyledLink to={`/user/${authorId}`}>
                  {firstName} {lastName}
                </StyledLink>
                <StyledDate>{formatDate(updatedAt)}</StyledDate>
                <StyledCommentContent>{content}</StyledCommentContent>
              </CommentInfo>
            </CommentContainer>
          );
        })}
      </Container>
    </>
  );
};

export default CommentsSection;
