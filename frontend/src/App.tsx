import { FC } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'auth';
import { Header, Footer } from 'layouts';
import Routes from 'routes';

const App: FC = () => {
  const theme = createTheme({
    palette: {
      mode: 'light'
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
