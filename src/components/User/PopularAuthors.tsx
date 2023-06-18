import {
  StyledContentContainer,
  StyledH1,
} from '../../styles/styledComponents/HelperComponents';
import Sidebar from '../Home/Sidebar/Sidebar';
import { styled } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { IPopularAuthors } from '../../../types/user';
import Users from './Users';
import useSelect, {
  getItemsPerPageOptions,
  timeRangeOptions,
} from '../../custom/useSelect';
import { usePagination, Pagination } from '../../custom/usePagination';
import Loading from '../shared/Loading';

const StyledMain = styled.main`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 75px;
  margin: 0 auto;
  max-width: 1200px;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 1rem 50px;
  }

  @media screen and (min-width: 769px) and (max-width: 924px) {
    img {
      display: none;
    }
  }
`;

const Selects = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopularAuthors = () => {
  const [users, setUsers] = useState<undefined | IPopularAuthors[]>(undefined);
  const userCount = useMemo(() => users?.length ?? 0, [users?.length]);

  const [timeRange, TimeRangeSelect] = useSelect('lastWeek');
  const [itemsPerPage, ItemsPerPageSelect] = useSelect('10');
  const { offset, ...paginationProps } = usePagination(itemsPerPage, userCount);

  useEffect(() => {
    const fetchAuthorsPopular = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users/popular?timeRange=${timeRange}&limit=${itemsPerPage}&offset=${offset}`,
      );
      const { users } = await res.json();
      setUsers(users);
    };
    fetchAuthorsPopular();
  }, [timeRange, itemsPerPage, offset]);

  return users ? (
    <StyledMain>
      <StyledContentContainer>
        <StyledH1>Explore Popular Authors</StyledH1>
        <Selects>
          <TimeRangeSelect {...timeRangeOptions} />
          <ItemsPerPageSelect {...getItemsPerPageOptions('User')} />
        </Selects>
        <UserContainer>
          <Users users={users} />
          <Pagination {...paginationProps} />
        </UserContainer>
      </StyledContentContainer>
      <Sidebar />
    </StyledMain>
  ) : (
    <Loading />
  );
};

export default PopularAuthors;
