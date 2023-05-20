import './styles/scss/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { styled, ThemeProvider } from 'styled-components';
import { UserProvider } from './context/UserContext';
import Routes from './Routes';
import { ModalProvider } from 'react-hook-modal-pure';
import theme from './styles/styledComponents/theme';

const AppContainer = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
`;

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AppContainer>
              <Routes />
            </AppContainer>
          </BrowserRouter>
        </ThemeProvider>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
