import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { styled } from 'styled-components';
import { useUserContext } from '../../context/UserContext';
import useErrorHandler from '../Errors/useErrorHandler';

const StyledFollowButton = styled.button`
  font-size: 0.8rem;
  text-decoration: underline;
  font-weight: 700;
  width: 60px;
`;

interface Props {
  followers: string[];
  setFollowerCount?: Dispatch<SetStateAction<number>>;
  userId?: string;
}

const Follow = ({ followers, setFollowerCount, userId }: Props) => {
  const { id } = useParams();
  const { user } = useUserContext();
  const handleErrors = useErrorHandler();
  const navigate = useNavigate();

  const isFollowing = useMemo(() => {
    return followers.some((followerId) => followerId === user?._id);
  }, [followers, user]);

  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  const handleClickFollowButton = async () => {
    if (!user) return navigate('/login');

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId || id}/${
        isFollowingState ? 'unfollow' : 'follow'
      }}`,
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

    if (setFollowerCount) {
      setFollowerCount((prev) => {
        return prev + (isFollowingState ? -1 : 1);
      });
    }
    setIsFollowingState(true);
  };

  return (
    <StyledFollowButton onClick={handleClickFollowButton}>
      {isFollowingState ? 'Following' : '+Follow'}
    </StyledFollowButton>
  );
};

export default Follow;
