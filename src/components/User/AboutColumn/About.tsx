import IUser from '../../../../types/user.d';
import { formatDate } from '../../shared/formattingHelpers';
import { useState } from 'react';
import Following from './Following';
import Follow from '../../shared/Follow';
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
        <StyledDate>Joined {formatDate(createdAt)}</StyledDate>
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
