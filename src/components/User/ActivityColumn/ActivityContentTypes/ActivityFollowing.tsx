import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IUser from '../../../../../types/user';
import { styled } from 'styled-components';
import Follow from '../../../shared/Follow';
import { useUserContext } from '../../../../context/UserContext';

const Container = styled.div`
  display: flex;
  flex-direction: column
  gap: 1rem;
  width: 100%;
`;

const FollowingUser = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const UserProfile = styled(Link)`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ActivityFollowing = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const [following, setFollowing] = useState<Partial<IUser[]>>([]);
  useEffect(() => {
    const fetchFollowing = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${id ?? user?._id}/following`,
      );
      const { following } = await res.json();
      setFollowing(following);
    };
    fetchFollowing();
  }, [id, user?._id]);

  return following.length ? (
    <Container>
      {following.map((user) => {
        if (!user) return null;
        const { username, _id, followers: userFollowers } = user;
        const avatarUrl = user?.avatarUrl;
        return (
          <FollowingUser key={_id}>
            <UserProfile to={`/user/${_id}`}>
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  style={{ height: '50px', width: '50px' }}
                  alt="Placeholder"
                />
              )}
              <h3>{username}</h3>
            </UserProfile>
            <Follow followers={userFollowers as string[]} userId={_id} />
          </FollowingUser>
        );
      })}
    </Container>
  ) : (
    <p>Not currently following any users...</p>
  );
};

export default ActivityFollowing;
