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
import Loading from '../../shared/Loading';
import { PaginateProps, Pagination } from '../../../custom/usePagination';

interface Props {
  users: AdminUser[];
  paginationProps: PaginateProps;
}

const EditUsers = ({ users, paginationProps }: Props) => {
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
      <Pagination {...paginationProps} />
    </AdminContainer>
  ) : (
    <Loading />
  );
};

export default EditUsers;
