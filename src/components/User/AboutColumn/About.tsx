import IUser from '../../../../types/user.d';
import { formatDate } from '../../Shared/formattingHelpers';
import { useEffect, useState } from 'react';
import Following from './Following';
import Follow from '../../Shared/Follow';
import {
  FollowersContainer,
  RightColumn,
  StyledDescription,
  StyledFollowerCount,
  StyledDate,
  StyledName,
  StyledNameContainer,
  StyledSection,
  StyledUsername,
} from '../../../styles/styledComponents/AboutComponents';

interface Props {
  user: IUser;
  isViewingOwnProfile: boolean;
}

const About = ({ isViewingOwnProfile, user }: Props) => {
  const { username, createdAt, followers, description, following, firstName, lastName } =
    user;
  const avatarUrl = user?.avatarUrl as string;

  const [followerCount, setFollowerCount] = useState(followers?.length ?? 0);
  useEffect(() => {
    setFollowerCount(followers?.length ?? 0);
  }, [followers]);

  return (
    <RightColumn>
      <StyledSection className="info">
        {avatarUrl && (
          <img
            src={avatarUrl}
            style={{ height: '100px', width: '100px' }}
            alt="Placeholder"
          />
        )}
        <StyledNameContainer>
          <StyledName>
            {firstName} {lastName}
          </StyledName>
          <StyledUsername>@{username}</StyledUsername>
        </StyledNameContainer>
        <StyledDate>Joined {formatDate(createdAt)}</StyledDate>
        <FollowersContainer>
          <StyledFollowerCount>{followerCount} Followers</StyledFollowerCount>
          {!isViewingOwnProfile && (
            <Follow
              followers={followers as string[]}
              setFollowerCount={setFollowerCount}
            />
          )}
        </FollowersContainer>
      </StyledSection>
      {description && <StyledDescription>{description}</StyledDescription>}
      <StyledSection>
        {!!following.length && (
          <Following
            following={following as (IUser | undefined)[]}
            isViewingOwnProfile={isViewingOwnProfile}
          />
        )}
      </StyledSection>
    </RightColumn>
  );
};

export default About;
