import { styled } from 'styled-components';
import { IPopularAuthors } from '../../../types/user';
import UserPreview from './UserPreview';

const StyledUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  min-width: 300px;
`;

const StyledNoUsersMessage = styled.p`
  margin: 2rem 0;
  font-size: 2rem;
  text-align: center;
`;

interface Props {
  users?: IPopularAuthors[];
}

const Users = ({ users }: Props) => {
  return (
    <StyledUsersContainer>
      {users?.length ? (
        users.map((user) => <UserPreview key={user._id} user={user} />)
      ) : (
        <StyledNoUsersMessage>{`No Users here yet..`}</StyledNoUsersMessage>
      )}
    </StyledUsersContainer>
  );
};

export default Users;
