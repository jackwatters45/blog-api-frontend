import { Link } from 'react-router-dom';
import IUser from '../../../../types/user.d';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`;

const StyledHeader = styled.strong`
  font-size: 1.1rem;
`;

const StyledLink = styled(Link)`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: underline;
`;

const UserContainer = styled(Link)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledUser = styled.p`
  font-size: 0.9rem;
`;

interface Props {
  following: string[] | (IUser | undefined)[];
  isViewingOwnProfile?: boolean;
}

const Following = ({ following, isViewingOwnProfile }: Props) => {
  return (
    <Container>
      <StyledHeader>Following</StyledHeader>
      {following.slice(0, 5).map((user) => {
        const { _id, firstName, lastName } = user as IUser;
        return (
          <UserContainer key={_id} to={`/user/${_id}`}>
            <img
              src="https://via.placeholder.com/20"
              style={{ height: '1rem', width: '1rem' }}
              alt="Placeholder"
            />
            <StyledUser>
              {firstName} {lastName}
            </StyledUser>
          </UserContainer>
        );
      })}
      <StyledLink to={`following`}>
        {isViewingOwnProfile ? 'See all' : `See all (${following.length})`}
      </StyledLink>
    </Container>
  );
};

export default Following;
