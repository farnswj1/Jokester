import { FC, PropsWithChildren, useEffect, useState } from 'react';
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  useMediaQuery,
  ThemeProvider
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { PaletteModeContext } from 'contexts';

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
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
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </PaletteModeContext.Provider>
  );
};

export default CustomThemeProvider;
