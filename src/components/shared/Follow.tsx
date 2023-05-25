import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { styled } from 'styled-components';
import { useUserContext } from '../../context/UserContext';

const StyledFollowButton = styled.button`
  font-size: 0.8rem;
  text-decoration: underline;
  font-weight: 700;
  width: 60px;
`;

type Props = {
  followers: string[];
  setFollowerCount: Dispatch<SetStateAction<number>>;
  userId?: string;
};

const Follow = ({ followers, setFollowerCount, userId }: Props) => {
  const { id } = useParams();
  const { user } = useUserContext();

  const navigate = useNavigate();

  const isFollowing = followers.some((followerId) => followerId === user?._id);
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  // if user id provided - user is being followed from a page other than their profile
  const handleClickFollow = async () => {
    if (!user) return navigate('/login');

    const FollowUser = async () => {
      setFollowerCount((prev) => prev + 1);
      setIsFollowingState(true);
      await fetch(`${import.meta.env.VITE_API_URL}/users/${userId || id}/follow`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    };
    FollowUser();
  };

  const handleClickUnfollow = async () => {
    if (!user) return navigate('/login');

    const UnfollowUser = async () => {
      setFollowerCount((prev) => prev - 1);
      setIsFollowingState(false);
      await fetch(`${import.meta.env.VITE_API_URL}/users/${userId || id}/unfollow`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    };
    UnfollowUser();
  };

  return isFollowingState ? (
    <StyledFollowButton onClick={handleClickUnfollow}>Following</StyledFollowButton>
  ) : (
    <StyledFollowButton onClick={handleClickFollow}>+Follow</StyledFollowButton>
  );
};

export default Follow;
