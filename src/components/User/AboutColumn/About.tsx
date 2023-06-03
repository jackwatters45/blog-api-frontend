import IUser from '../../../../types/user.d';
import { styled } from 'styled-components';
import { formatDate } from '../../shared/formattingHelpers';
import { useState } from 'react';
import Following from './Following';
import Follow from '../../shared/Follow';

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 300px;
  min-width: 200px;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    padding-top: 3rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    max-width: 100%;

    .description {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
    }
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

const StyledDescription = styled.p`
  font-size: 0.8rem;
`;

interface Props {
  user: IUser;
}

const About = ({
  user: { username, createdAt, followers, description, following, firstName, lastName },
}: Props) => {
  const img = 'https://via.placeholder.com/100';

  const [followerCount, setFollowerCount] = useState(followers?.length ?? 0);

  return (
    <RightColumn>
      <StyledSection className="info">
        {img && (
          <img src={img} style={{ height: '100px', width: '100px' }} alt="Placeholder" />
        )}
        <StyledNameContainer>
          <StyledName>
            {firstName} {lastName}
          </StyledName>
          <StyledUsername>@{username}</StyledUsername>
        </StyledNameContainer>
        <StyledJoined>Joined {formatDate(createdAt)}</StyledJoined>
        <FollowersContainer>
          <StyledFollowerCount>{followerCount} Followers</StyledFollowerCount>
          <Follow followers={followers as string[]} setFollowerCount={setFollowerCount} />
        </FollowersContainer>
      </StyledSection>
      {description && <StyledDescription>{description}</StyledDescription>}
      <StyledSection>
        {!!following.length && <Following following={following} />}
      </StyledSection>
    </RightColumn>
  );
};

export default About;
