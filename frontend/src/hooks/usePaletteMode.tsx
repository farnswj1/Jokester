import { useContext } from 'react';
import { PaletteModeContext } from 'contexts';

const usePaletteMode = () => useContext(PaletteModeContext);

export default usePaletteMode;
