import { FC } from 'react';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'auth';
import { Header, Footer } from 'layouts';
import Routes from 'routes';

const App: FC = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: deepPurple[500]
      },
      background: {
        default: '#dddddd'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            bgcolor="background.default"
            color="text.primary"
          >
            <Header />
            <Box
              component="main"
              bgcolor="background.default"
              color="text.primary"
              paddingY={5}
            >
              <Routes />
            </Box>
            <Footer />
          </Box>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
