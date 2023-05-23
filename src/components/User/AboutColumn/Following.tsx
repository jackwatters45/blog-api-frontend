import { Link } from 'react-router-dom';
import IUser from '../../../../types/user.d';
import { styled } from 'styled-components';
import { getUserFullName } from '../../../utils/formattingHelpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
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

type Props = {
  following: string[] | (IUser | undefined)[];
};

const Following = ({ following }: Props) => {
  return (
    <Container>
      <StyledHeader>Following</StyledHeader>
      {following.slice(0, 5).map((user) => {
        if (typeof user === 'string') return null;
        return (
          <UserContainer key={user?._id} to={`/user/${user?._id}`}>
            <img
              src="https://via.placeholder.com/20"
              style={{ height: '1rem', width: '1rem' }}
              alt="Placeholder"
            />
            <StyledUser>{getUserFullName(user as IUser)}</StyledUser>
          </UserContainer>
        );
      })}
      <StyledLink to={`comments`}>See all ({following.length})</StyledLink>
    </Container>
  );
};

export default Following;
