import { useUserContext } from '../../context/UserContext';
import { useNavigate, useLocation } from 'react-router';
import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';
import useErrorHandler from '../../custom/useErrorHandler';

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
  const handleErrors = useErrorHandler();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickLike = async () => {
    if (!user) return navigate('/login', { state: { from: pathname } });
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${_id}/${!hasUserLiked ? 'like' : 'unlike'}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!res.ok) {
      handleErrors(res);
      return;
    }

    setLikesCount((prev) => prev + (!hasUserLiked ? 1 : -1));
    setHasUserLiked((prev) => !prev);
  };

  return (
    <LikeButton onClick={handleClickLike} hasUserLiked={hasUserLiked}>
      <p>❤️</p>
      <p>{likesCount}</p>
    </LikeButton>
  );
};

export default Likes;
