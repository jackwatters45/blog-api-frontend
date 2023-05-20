import Nav from '../Nav/Nav';
import { styled } from 'styled-components';
import Posts from './Posts/Posts';
import Sidebar from './Sidebar/Sidebar';

const StyledMain = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
  gap: 50px;
`;

const Dashboard = () => {
  return (
    <>
      <Nav />
      <StyledMain>
        <Posts />
        <Sidebar />
      </StyledMain>
    </>
  );
};

export default Dashboard;
