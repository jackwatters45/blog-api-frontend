import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import IUser from '../../../types/user';
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
  usersProp?: IUser[];
  selectedFilter?: boolean;
}

const Users = ({ usersProp, selectedFilter }: Props) => {
  const [users, setUsers] = useState<IUser[] | undefined>(undefined);

  useEffect(() => {
    if (selectedFilter) return setUsers(usersProp);
    const fetchUsersNew = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Users`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsersNew();
  }, [selectedFilter, usersProp]);

  return (
    <StyledUsersContainer>
      {users?.length ? (
        users.map((user: IUser) => <UserPreview key={user._id} user={user} />)
      ) : (
        <StyledNoUsersMessage>{`No Users here yet..`}</StyledNoUsersMessage>
      )}
    </StyledUsersContainer>
  );
};

export default Users;
