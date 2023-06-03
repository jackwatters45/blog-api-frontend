import { useState } from 'react';
import IUser, { IPopularAuthors } from '../../../types/user';
import { StyledHrHorizontal } from '../../styles/styledComponents/theme';
import { styled } from 'styled-components';
import Follow from '../shared/Follow';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  justify-content: space-between;
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

const StyledFollowerAndLikes = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledDescription = styled.p`
  font-size: 0.9rem;
`;

interface Props {
  user: IUser;
}

const UserPreview = ({ user }: Props) => {
  const { firstName, lastName, followers, description, _id, likesCountInTimeRange } =
    user as IPopularAuthors;
  const img = 'https://via.placeholder.com/100';

  const [followerCount, setFollowerCount] = useState(followers?.length ?? 0);

  return (
    <>
      <StyledHrHorizontal />
      <Container>
        {img && (
          <StyledImg
            src={img}
            style={{ height: '100px', width: '100px' }}
            alt="Placeholder"
          />
        )}
        <LeftColumn to={`/user/${_id}`}>
          <h3>
            {firstName} {lastName}
          </h3>
          <StyledFollowerAndLikes>
            <p>{followerCount} Followers</p>
            <p>•</p>
            <p>{likesCountInTimeRange} Likes</p>
          </StyledFollowerAndLikes>
          {description && <StyledDescription>{description}</StyledDescription>}
        </LeftColumn>
        <Follow
          followers={followers as string[]}
          setFollowerCount={setFollowerCount}
          userId={_id}
        />
      </Container>
    </>
  );
};

export default UserPreview;
