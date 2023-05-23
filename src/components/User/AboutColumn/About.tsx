import IUser from '../../../../types/user.d';
import { styled } from 'styled-components';
import { formatDate, getUserFullName } from '../../../utils/formattingHelpers';
import { useState } from 'react';
import Following from './Following';
import { useParams } from 'react-router-dom';

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 300px;
  min-width: 200px;
  padding: 0 1rem;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    padding-top: 3rem;
  }
`;

const StyledNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

const StyledUsername = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-left: 0.25rem;
`;

const StyledJoined = styled.p`
  font-size: 0.95rem;
`;

const FollowersContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledFollowerCount = styled.p`
  font-size: 0.9rem;
`;

const StyledFollowButton = styled.button`
  font-size: 0.8rem;
  text-decoration: underline;
  font-weight: 700;
`;

const StyledDescription = styled.p`
  font-size: 0.8rem;
`;

type Props = {
  user: IUser;
};

const About = ({ user }: Props) => {
  const { id } = useParams();
  const { username, createdAt, followers, description, following } = user;
  const img = 'https://via.placeholder.com/100';

  const [followerCount, setFollowerCount] = useState(followers?.length ?? 0);
  const handleFollow = async () => {
    setFollowerCount(followers?.length + 1);
    await fetch(`${import.meta.env.VITE_API_URL}/users/${id}/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  };

  return (
    <RightColumn>
      {img && (
        <img src={img} style={{ height: '100px', width: '100px' }} alt="Placeholder" />
      )}
      <StyledNameContainer>
        <StyledName>{getUserFullName(user)}</StyledName>
        <StyledUsername>@{username}</StyledUsername>
      </StyledNameContainer>
      <StyledJoined>Joined {formatDate(createdAt)}</StyledJoined>
      <FollowersContainer>
        <StyledFollowerCount>{followerCount} Followers</StyledFollowerCount>
        <StyledFollowButton onClick={handleFollow}>+Follow</StyledFollowButton>
      </FollowersContainer>
      {description && <StyledDescription>{description}</StyledDescription>}
      {!!following && <Following following={following} />}
    </RightColumn>
  );
};

export default About;
