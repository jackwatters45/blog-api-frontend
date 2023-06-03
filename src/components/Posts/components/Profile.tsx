import { styled } from 'styled-components';
import IUser from '../../../../types/user';
import { StyledHrHorizontal } from '../../../styles/styledComponents/theme';
import Follow from '../../shared/Follow';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  justify-content: space-evenly;
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
  author: Partial<IUser> | string;
}

const Profile = ({ author }: Props) => {
  const { firstName, followers, description, _id } = author as IUser;
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
    </>
  );
};

export default Profile;
