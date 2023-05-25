import Nav from '../Nav/Nav';
import {
  StyledContentContainer,
  StyledH1,
} from '../../styles/styledComponents/HelperComponents';
import Sidebar from '../Home/Sidebar/Sidebar';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import TimeRange from '../shared/TimeRange';
import IUser from '../../../types/user';
import Users from './Users';
import useTimeRange from '../../custom/useTimeRange';

const StyledMain = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 1rem 100px;
  margin: 0 auto;
  max-width: 1200px;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 1rem 50px;
`;

// make topic page use popular aspect so its similar
const PopularAuthors = () => {
  const [users, setUsers] = useState<undefined | IUser[]>(undefined);

  const { timeRange, handleSelectRange } = useTimeRange();

  useEffect(() => {
    const fetchAuthorsPopular = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/popular?timeRange=${timeRange}&limit=10`,
      );
      const data = await res.json();
      console.log(data);
      setUsers(data);
    };
    fetchAuthorsPopular();
  }, [timeRange]);

  return (
    <>
      <Nav />
      <StyledMain>
        <StyledContentContainer>
          <StyledH1>Explore Popular Authors</StyledH1>
          <TimeRange timeRange={timeRange} handleSelectRange={handleSelectRange} />
          <Users usersProp={users} selectedFilter={true} />
        </StyledContentContainer>
        <Sidebar />
      </StyledMain>
    </>
  );
};

export default PopularAuthors;
