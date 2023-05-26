import { styled } from 'styled-components';
import Posts from '../Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import Nav from '../Nav/Nav';

const StyledMain = styled.main`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 75px;
  margin: 0 auto;
  max-width: 1200px;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 1rem 50px;
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
