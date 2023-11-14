import { createContext, Dispatch, SetStateAction } from 'react';
import { PaletteMode } from '@mui/material';

const PaletteModeContext = createContext<Dispatch<SetStateAction<PaletteMode>>>(() => {});

export default PaletteModeContext;
