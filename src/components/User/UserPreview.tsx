import { useState } from 'react';
import { IPopularAuthors } from '../../../types/user';
import { styled } from 'styled-components';
import Follow from '../Shared/Follow';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledImg = styled.img`
  align-self: start;

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
  user: IPopularAuthors;
}

const UserPreview = ({ user }: Props) => {
  const { firstName, lastName, followers, description, _id, likesCountInTimeRange } =
    user;
  const avatarUrl = user?.avatarUrl as string;

  const [followerCount, setFollowerCount] = useState(followers?.length ?? 0);

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
        <h3>
          {firstName} {lastName}
        </h3>
        <StyledFollowerAndLikes>
          <p>{followerCount} Followers</p>
          <p>•</p>
          <p>{likesCountInTimeRange ?? 0} Likes</p>
        </StyledFollowerAndLikes>
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

export default UserPreview;
