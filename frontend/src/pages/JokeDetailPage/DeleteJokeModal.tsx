import { FC } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Typography
} from '@mui/material';
import { paddingStyle } from 'utils';

interface DeleteJokeModalProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteJokeModal: FC<DeleteJokeModalProps> = ({
  open,
  onClose,
  onDelete
}) => {
  const boxStyle = {
    width: 480,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 10,
    p: 3,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-joke-modal-title"
      aria-describedby="delete-joke-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box sx={boxStyle}>
        <Typography
          id="delete-joke-modal-title"
          variant="h6"
          sx={paddingStyle}
        >
          Are you sure you want to delete this joke?
        </Typography>
        <Typography
          id="delete-joke-modal-description"
          sx={paddingStyle}
        >
          This action cannot be undone!
        </Typography>
        <ButtonGroup variant="contained">
          <Button size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
};

export default DeleteJokeModal;
