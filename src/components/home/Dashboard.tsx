import Posts from '../Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import Nav from '../Nav/Nav';
import { StyledMain } from '../../styles/styledComponents/HelperComponents';

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
