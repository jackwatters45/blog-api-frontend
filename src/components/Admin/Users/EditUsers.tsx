import EditUserCard from './EditUserCard';
import {
  AdminContainer,
  CardContainer,
  FilterContainer,
  FilterError,
  StyledCreateLink,
  StyledHeader,
} from '../../../styles/styledComponents/AdminCardComponents';
import { IAdminUser } from '../../../../types/user';
import Loading from '../../shared/Loading';
import { PaginateProps, Pagination } from '../../../custom/usePagination';
import { styled } from 'styled-components';
import { useSearchSingleCategory } from '../../../custom/useSearchSingle';

const StyledInput = styled.input`
  width: calc(100% - 59.25px);
`;

interface Props {
  users: IAdminUser[];
  paginationProps: PaginateProps;
}

const EditUsers = ({ users, paginationProps }: Props) => {
  const [filteredUsers, searchInput, setSearchInput, onSubmit, isFilter] =
    useSearchSingleCategory<IAdminUser>(users, 'admin/users');

  return filteredUsers ? (
    <AdminContainer>
      <StyledHeader>
        <h1>Edit Users</h1>
        <StyledCreateLink to={`/admin/users/create`}>+ Create User</StyledCreateLink>
      </StyledHeader>
      <FilterContainer>
        <form onSubmit={onSubmit}>
          <StyledInput
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Users..."
          />
          <input type="submit" value="Search" />
        </form>
      </FilterContainer>
      <CardContainer>
        {filteredUsers?.length ? (
          filteredUsers.map((user: IAdminUser) => {
            return <EditUserCard key={user._id} user={user} />;
          })
        ) : (
          <FilterError>
            {isFilter ? `No users match your filter...` : `No Users`}
          </FilterError>
        )}
      </CardContainer>
      <Pagination {...paginationProps} />
    </AdminContainer>
  ) : (
    <Loading />
  );
};

export default EditUsers;
