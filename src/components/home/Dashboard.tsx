import Posts from '../Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import { StyledMain } from '../../styles/styledComponents/HelperComponents';

const Dashboard = () => {
  return (
    <StyledMain>
      <Posts />
      <Sidebar />
    </StyledMain>
  );
};

export default Dashboard;
