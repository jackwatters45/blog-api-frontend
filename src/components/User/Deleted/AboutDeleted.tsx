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

const AboutDeleted = ({
  user: { createdAt, description, following, firstName, lastName, deletedData },
}: Props) => {
  const img = 'https://via.placeholder.com/100';

  const { username, email, deletedAt, deletedBy, followerCount } =
    deletedData as DeletedData;

  return (
    <RightColumn>
      <StyledSection className="info">
        {img && (
          <img src={img} style={{ height: '100px', width: '100px' }} alt="Placeholder" />
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
        {!!following.length && <Following following={following} />}
      </StyledSection>
    </RightColumn>
  );
};

export default AboutDeleted;
