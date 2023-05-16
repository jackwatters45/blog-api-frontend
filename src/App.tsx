import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { styled } from 'styled-components';
import { UserProvider } from './context/UserContext';
import Routes from './Routes';

const AppContainer = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
`;

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContainer>
          <Routes />
        </AppContainer>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
