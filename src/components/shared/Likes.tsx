import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';
import useErrorHandler from '../Errors/useErrorHandler';

interface Props {
  hasUserLiked: boolean;
  likesCount: number;
  _id: string;
  setLikesCount: Dispatch<SetStateAction<number>>;
  setHasUserLiked: Dispatch<SetStateAction<boolean>>;
}

interface LikeButtonProps {
  hasUserLiked: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ hasUserLiked, theme }) =>
    hasUserLiked ? theme.colors.selected : 'inherit'};
  ${({ theme }) => theme.hoverNoBorder};
`;

const Likes = ({
  hasUserLiked,
  likesCount,
  setLikesCount,
  setHasUserLiked,
  _id,
}: Props) => {
  const { user } = useUserContext();

  const handleError = useErrorHandler();
  const navigate = useNavigate();

  const handleClickLike = async () => {
    if (!user) return navigate('/login');

    const likePost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${_id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        handleError(res);
        return;
      }

      setLikesCount((prev) => prev + 1);
      setHasUserLiked(true);
    };

    const unlikePost = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${_id}/unlike`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        handleError(res);
        return;
      }

      setLikesCount((prev) => prev - 1);
      setHasUserLiked(false);
    };

    return hasUserLiked ? unlikePost() : likePost();
  };

  return (
    <LikeButton onClick={handleClickLike} hasUserLiked={hasUserLiked}>
      <p>❤️</p>
      <p>{likesCount}</p>
    </LikeButton>
  );
};

export default Likes;
