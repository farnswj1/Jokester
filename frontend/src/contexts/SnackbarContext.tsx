import { Dispatch, SetStateAction, createContext } from 'react';
import { CustomSnackbarProps } from 'types';

const PaletteModeContext = createContext<Dispatch<SetStateAction<CustomSnackbarProps>>>(() => {});

export default PaletteModeContext;
