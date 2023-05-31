import { useEffect, useState } from 'react';
import IUser from '../../../../types/user';
import { styled } from 'styled-components';
import { StyledMain } from '../../../styles/styledComponents/HelperComponents';
import Filter from '../../shared/Filter/Filter';
import EditUserCard from './EditUserCard';

const Container = styled(StyledMain)`
  max-width: 1250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const FilterContainer = styled.div`
  padding-right: 1rem;
`;

const StyledPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

// card
// filter
// backend
// reorganize
const EditUsersAdmin = () => {
  const [users, setUsers] = useState<undefined | IUser[]>(undefined);
  useEffect(() => {
    const fetchUsers = async () => {
      // TODO change to all
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        credentials: 'include',
      });
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users ?? []);
  useEffect(() => {
    setFilteredUsers(users ?? []);
  }, [users]);

  const filterFunction = (filter: string, filterType: string, usersData: IUser[]) => {
    return usersData;
  };

  return filteredUsers ? (
    <Container>
      <h1>Edit Users</h1>
      <FilterContainer>
        <Filter<IUser>
          data={users ?? []}
          setFilteredData={setFilteredUsers}
          filterFunction={filterFunction}
          // TODO
          filterOptions={[
            { value: '', label: 'Any' },
            { value: 'title', label: 'Title' },
            { value: 'author', label: 'Author' },
            { value: 'topic', label: 'Topic' },
          ]}
        />
      </FilterContainer>
      <StyledPosts>
        {filteredUsers?.length ? (
          filteredUsers.map((user: IUser) => {
            return <EditUserCard key={user._id} user={user} />;
          })
        ) : (
          <div>{`No users here yet..`}</div>
        )}
      </StyledPosts>
    </Container>
  ) : null;
};

export default EditUsersAdmin;
