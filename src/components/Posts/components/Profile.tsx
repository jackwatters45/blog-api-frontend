import { styled } from 'styled-components';
import IUser from '../../../../types/user';
import Follow from '../../shared/Follow';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  padding: 2rem 0;
  justify-content: space-evenly;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledImg = styled.img`
  align-self: center;

  @media (max-width: 640px) {
    display: none;
  }
`;

const LeftColumn = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledFollowerCount = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledDescription = styled.p`
  font-size: 0.9rem;
`;

interface Props {
  user: Partial<IUser>;
}

const Profile = ({ user }: Props) => {
  const { firstName, followers, description, _id } = user as IUser;

  const [followerCount, setFollowerCount] = useState(followers?.length ?? 0);

  const avatarUrl = user?.avatarUrl as string;
  return (
    <Container>
      {avatarUrl && (
        <StyledImg
          src={avatarUrl}
          style={{ height: '100px', width: '100px' }}
          alt="avatar"
        />
      )}
      <LeftColumn to={`/user/${_id}`}>
        <h3>Written by {firstName}</h3>
        <StyledFollowerCount>{followerCount} Followers</StyledFollowerCount>
        {description && <StyledDescription>{description}</StyledDescription>}
      </LeftColumn>
      <Follow
        followers={followers as string[]}
        setFollowerCount={setFollowerCount}
        userId={_id}
      />
    </Container>
  );
};

export default Profile;
