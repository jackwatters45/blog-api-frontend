import { styled } from 'styled-components';
import Posts from './Posts/Posts';
import Sidebar from './Sidebar/Sidebar';

const StyledMain = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 3rem 0;
  margin: 0 auto;
  max-width: 1000px;
  gap: 50px;
`;

const Dashboard = () => {
  return (
    <StyledMain>
      <Posts />
      <Sidebar />
    </StyledMain>
  );
};

export default Dashboard;
