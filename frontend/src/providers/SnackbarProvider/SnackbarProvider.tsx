import { FC, PropsWithChildren, SyntheticEvent, useState } from 'react';
import { Alert, IconButton, Snackbar, SnackbarProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarContext } from 'contexts';
import { CustomSnackbarProps } from 'types';

interface SnackbarProviderProps extends PropsWithChildren {
  defaultProps?: SnackbarProps;
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children,
  defaultProps = {}
}) => {
  const [props, setProps] = useState<CustomSnackbarProps>({});
  const open = Boolean(props.message);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') {
      setProps({});
    }
  };

  return [
    <SnackbarContext.Provider key={0} value={setProps}>
      {children}
    </SnackbarContext.Provider>,
    <Snackbar
      key={1}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      {...defaultProps}
      open={open}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        severity={props.color}
        action={
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {props.message}
      </Alert>
    </Snackbar>
  ];
};

export default SnackbarProvider;
