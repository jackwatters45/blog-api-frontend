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
import { formatDate } from '../../shared/formattingHelpers';
import IUser, { DeletedData } from '../../../../types/user';
import Following from '../AboutColumn/Following';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

interface Props {
  user: IUser;
}

const AboutDeleted = ({ user }: Props) => {
  const { createdAt, description, following, firstName, lastName, deletedData } = user;
  const { username, email, deletedAt, deletedBy, followerCount } =
    deletedData as DeletedData;
  const avatarUrl = user?.avatarUrl as string;

  return (
    <RightColumn>
      <StyledSection className="info">
        {avatarUrl && (
          <img src={avatarUrl} style={{ height: '100px', width: '100px' }} alt="avatar" />
        )}
        <StyledNameContainer>
          <StyledName>
            {firstName} {lastName} - DELETED
          </StyledName>
          <StyledUsername>
            @{username} | ${email}
          </StyledUsername>
        </StyledNameContainer>
        <StyledDate>
          Deleted {formatDate(deletedAt)}
          {deletedBy && typeof deletedBy !== 'string' && (
            <>
              by{' '}
              <StyledLink to={`/user/${deletedBy?._id}`}>
                {`${deletedBy?.firstName} ${deletedBy?.lastName}`}
              </StyledLink>
            </>
          )}
        </StyledDate>
        <StyledDate>Joined {formatDate(createdAt)}</StyledDate>
        <FollowersContainer>
          <StyledFollowerCount>{followerCount ?? 0} Followers</StyledFollowerCount>
        </FollowersContainer>
      </StyledSection>
      {description && <StyledDescription>{description}</StyledDescription>}
      <StyledSection>
        {!!following.length && (
          <Following following={following as (IUser | undefined)[]} />
        )}
      </StyledSection>
    </RightColumn>
  );
};

export default AboutDeleted;
