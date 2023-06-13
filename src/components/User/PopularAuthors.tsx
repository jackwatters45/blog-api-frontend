import {
  StyledContentContainer,
  StyledH1,
} from '../../styles/styledComponents/HelperComponents';
import Sidebar from '../Home/Sidebar/Sidebar';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import IUser from '../../../types/user';
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
  const [users, setUsers] = useState<undefined | IUser[]>(undefined);

  const [timeRange, TimeRangeSelect] = useSelect('lastWeek');

  const [userCount, setUserCount] = useState<number>(0);
  const [itemsPerPage, ItemsPerPageSelect] = useSelect('10');
  const { offset, ...paginationProps } = usePagination(itemsPerPage, userCount);

  useEffect(() => {
    const fetchAuthorsPopular = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users/popular?timeRange=${timeRange}&limit=${itemsPerPage}&offset=${offset}`,
      );
      const {
        users,
        meta: { total },
      } = await res.json();
      setUserCount(total);
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
          <Users usersProp={users} selectedFilter={true} />
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
