import { styled } from 'styled-components';
import IComment from '../../../../../types/comment';
import { useUserContext } from '../../../../context/UserContext';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../../../shared/formattingHelpers';
import CommentOptionsButton from './CommentOptions/CommentOptionsButton';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import useErrorHandler from '../../../../custom/useErrorHandler';

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
`;

const StyledCommentContent = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
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

const StyledDeleted = styled.i`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  font-size: 0.9rem;
`;

const StyledDate = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledCommentContentText = styled.p`
  font-size: 0.9rem;
`;

const StyledSocialButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledSocialButton = styled.button`
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
`;

const ActiveSocialButton = styled(StyledSocialButton)`
  background: ${({ theme }) => theme.colors.hover};
`;

interface Props {
  comment: IComment;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
}

const CommentContent = ({
  comment: {
    _id,
    content,
    author: { firstName, lastName, _id: authorId, avatarUrl, isDeleted },
    updatedAt,
    likes: initialLikes,
    dislikes: initialDislikes,
    isDeleted: commentIsDeleted,
  },
  setIsEditing,
  setIsReplying,
}: Props) => {
  const handleErrors = useErrorHandler();
  const { user } = useUserContext();
  const userId = user?._id as string;
  const { id: postId } = useParams();

  const [likes, setLikes] = useState(initialLikes ?? []);
  const likesCount = useMemo(() => likes.length, [likes]);
  const isLiked = useMemo(() => likes.includes(userId), [likes, userId]);

  const [dislikes, setDislikes] = useState(initialDislikes ?? []);
  const dislikesCount = useMemo(() => dislikes.length, [dislikes]);
  const isDisliked = useMemo(() => dislikes.includes(userId), [dislikes, userId]);

  const handleSocialAction = async (action: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${_id}/${action}`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!res.ok) {
      handleErrors(res);
      return;
    }

    const { updatedLikes, updatedDislikes } = await res.json();
    setLikes(updatedLikes);
    setDislikes(updatedDislikes);
  };

  const likeComment = async () => handleSocialAction('like');
  const dislikeComment = async () => handleSocialAction('dislike');

  return (
    <CommentContainer key={_id} id={_id}>
      <StyledCommentContent>
        {avatarUrl && (
          <Link to={`/user/${authorId}`}>
            <StyledCommentImg src={avatarUrl} alt="avatar" />
          </Link>
        )}
        <CommentInfo>
          {!isDeleted ? (
            <StyledLink to={`/user/${authorId}`}>
              {firstName} {lastName}
            </StyledLink>
          ) : (
            <StyledDeleted>Deleted</StyledDeleted>
          )}
          <StyledDate>{formatDate(updatedAt)}</StyledDate>
          <StyledCommentContentText>{content}</StyledCommentContentText>
          <StyledSocialButtons>
            {isLiked ? (
              <ActiveSocialButton onClick={likeComment}>
                {likesCount} Likes
              </ActiveSocialButton>
            ) : (
              <StyledSocialButton onClick={likeComment}>
                {likesCount} Likes
              </StyledSocialButton>
            )}
            {isDisliked ? (
              <ActiveSocialButton onClick={dislikeComment}>
                {dislikesCount} Dislikes
              </ActiveSocialButton>
            ) : (
              <StyledSocialButton onClick={dislikeComment}>
                {dislikesCount} Dislikes
              </StyledSocialButton>
            )}
            <button onClick={() => setIsReplying(true)}>Reply</button>
          </StyledSocialButtons>
        </CommentInfo>
      </StyledCommentContent>
      {user && authorId === user._id && !commentIsDeleted && (
        <CommentOptionsButton commentId={_id} setIsEditing={setIsEditing} />
      )}
    </CommentContainer>
  );
};

export default CommentContent;
