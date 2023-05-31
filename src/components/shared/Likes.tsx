import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';

type Props = {
  hasUserLiked: boolean;
  likesCount: number;
  _id: string;
  setLikesCount: Dispatch<SetStateAction<number>>;
  setHasUserLiked: Dispatch<SetStateAction<boolean>>;
};

interface LikeButtonProps {
  hasUserLiked: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.hasUserLiked ? 'rgb(55, 55, 55)' : 'inherit')};

  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
  }
`;

const Likes = ({
  hasUserLiked,
  likesCount,
  setLikesCount,
  setHasUserLiked,
  _id,
}: Props) => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  const handleClickLike = async () => {
    if (!user) return navigate('/login');

    const likePost = async () => {
      setLikesCount((prev) => prev + 1);
      setHasUserLiked(true);
      await fetch(`${import.meta.env.VITE_API_URL}/posts/${_id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    };

    const unlikePost = async () => {
      setLikesCount((prev) => prev - 1);
      setHasUserLiked(false);
      await fetch(`${import.meta.env.VITE_API_URL}/posts/${_id}/unlike`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
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