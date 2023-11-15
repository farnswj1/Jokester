import { FC, useEffect, useState } from 'react';
import {
  Box,
  createTheme,
  PaletteMode,
  useMediaQuery,
  ThemeProvider
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'auth';
import { SnackbarProvider } from 'providers';
import { PaletteModeContext } from 'contexts';
import { Header, Footer } from 'layouts';
import Routes from 'routes';

const App: FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let initialMode = localStorage.getItem('mode') as PaletteMode | null;

  if (initialMode === null) {
    initialMode = prefersDarkMode ? 'dark' : 'light';
  }

  const [paletteMode, setPaletteMode] = useState<PaletteMode>(initialMode);
  useEffect(() => localStorage.setItem('mode', paletteMode), [paletteMode]);

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      primary: {
        main: deepPurple[500]
      },
      background: {
        default: paletteMode === 'dark' ? '#343434' : '#dddddd'
      }
    }
  });

  return (
    <PaletteModeContext.Provider value={setPaletteMode}>
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
              <SnackbarProvider defaultProps={{ autoHideDuration: 5000 }}>
                <Header />
                <Box
                  component="main"
                  bgcolor="inherit"
                  color="inherit"
                  paddingY={5}
                  marginBottom="auto"
                >
                  <Routes />
                </Box>
                <Footer />
              </SnackbarProvider>
            </Box>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </PaletteModeContext.Provider>
  );
};

export default App;
