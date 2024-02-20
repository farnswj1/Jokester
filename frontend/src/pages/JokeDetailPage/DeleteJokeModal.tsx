import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

interface DeleteJokeModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteJokeModal: FC<DeleteJokeModalProps> = ({
  open,
  onClose,
  onDelete
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      Are you sure you want to delete this joke?
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        This action cannot be undone!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="contained" color="error" onClick={onDelete}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteJokeModal;
