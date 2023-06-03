import { BrowserRouter } from 'react-router-dom';
import { styled, ThemeProvider } from 'styled-components';
import { UserProvider } from './context/UserContext';
import Routes from './Routes';
import { ModalProvider } from 'react-hook-modal-pure';
import { SidebarProvider } from './context/SidebarContext';
import { useColorTheme } from './styles/theme/useColorTheme';
import GlobalStyle from './styles/theme/GlobalStyle';

const AppContainer = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
`;

function App() {
  const colorTheme = useColorTheme();

  return (
    <UserProvider>
      <SidebarProvider>
        <ModalProvider>
          <ThemeProvider theme={colorTheme}>
            <BrowserRouter>
              <AppContainer>
                <GlobalStyle />
                <Routes />
              </AppContainer>
            </BrowserRouter>
          </ThemeProvider>
        </ModalProvider>
      </SidebarProvider>
    </UserProvider>
  );
}

export default App;
