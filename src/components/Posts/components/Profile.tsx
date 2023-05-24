import { styled } from 'styled-components';
import IUser from '../../../../types/user';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  justify-content: space-between;
`;

const StyledImg = styled.img`
  align-self: center;
`;

const LeftColumn = styled.div`
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

const StyledFollowButton = styled.button`
  align-self: center;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  text-decoration: underline;
  font-weight: 700;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

type Props = {
  author: Partial<IUser> | string;
};

const Profile = ({ author }: Props) => {
  const { firstName, followers, description } = author as IUser;
  const img = 'https://via.placeholder.com/100';

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
        <LeftColumn>
          <h3>Written by {firstName}</h3>
          <StyledFollowerCount>{followers?.length} Followers</StyledFollowerCount>
          <StyledDescription>{description}</StyledDescription>
        </LeftColumn>
        <StyledFollowButton>+Follow</StyledFollowButton>
      </Container>
    </>
  );
};

export default Profile;
