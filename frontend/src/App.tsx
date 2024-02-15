import { FC } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'auth';
import { CustomThemeProvider, SnackbarProvider } from 'providers';
import { Header, Footer } from 'layouts';
import Routes from 'routes';

const App: FC = () => (
  <CustomThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <SnackbarProvider defaultProps={{ autoHideDuration: 5000 }}>
          <Header />
          <Box component="main" paddingY={5} marginBottom="auto">
            <Routes />
          </Box>
          <Footer />
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </CustomThemeProvider>
);

export default App;
