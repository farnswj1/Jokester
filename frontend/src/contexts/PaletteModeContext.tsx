import { createContext } from 'react';
import { PaletteMode } from '@mui/material';

type TogglePaletteMode = (mode: PaletteMode) => void;

const PaletteModeContext = createContext<TogglePaletteMode>(() => {});

export default PaletteModeContext;
