import { SnackbarContentProps } from '@mui/material';

export default interface CustomSnackbarProps {
  message?: SnackbarContentProps['message'];
  color?: 'error' | 'info' | 'success' | 'warning';
}
