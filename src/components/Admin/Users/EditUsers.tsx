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
import Loading from '../../Shared/Loading';
import { PaginateProps, Pagination } from '../../../custom/usePagination';
import { useSearchSingleCategory } from '../../../custom/useSearchSingle';
import SearchForm from '../../Shared/SearchForm';
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
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSubmit={onSubmit}
          placeholder="Search Users..."
        />
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
