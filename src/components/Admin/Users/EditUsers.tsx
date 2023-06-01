import { useState } from 'react';
import Filter from '../../shared/Filter/Filter';
import EditUserCard from './EditUserCard';
import { userFilterOptions } from '../../shared/Filter/filterOptions';
import {
  AdminContainer,
  CardContainer,
  FilterContainer,
  FilterError,
} from '../../../styles/styledComponents/AdminCardComponents';
import { userFilterFunction } from '../../shared/Filter/filterFunctions';
import { AdminUser } from '../../../../types/post';

type Props = {
  users: AdminUser[];
};

const EditUsers = ({ users }: Props) => {
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>(users ?? []);

  return filteredUsers ? (
    <AdminContainer>
      <h1>Edit Users</h1>
      <FilterContainer>
        <Filter<AdminUser>
          data={users ?? []}
          setFilteredData={setFilteredUsers}
          filterFunction={userFilterFunction}
          filterOptions={userFilterOptions}
          placeHolder={'Filter Users...'}
        />
      </FilterContainer>
      <CardContainer>
        {filteredUsers?.length ? (
          filteredUsers.map((user: AdminUser) => {
            return <EditUserCard key={user._id} user={user} />;
          })
        ) : (
          <FilterError>{`No users match your filter...`}</FilterError>
        )}
      </CardContainer>
    </AdminContainer>
  ) : null;
};

export default EditUsers;
