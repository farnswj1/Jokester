import { FC, FormEventHandler } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { Joke } from 'types';
import { paddingStyle } from 'utils';

interface JokeFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>
  isLoading: boolean
  joke?: Joke
}

const JokeForm: FC<JokeFormProps> = ({
  isLoading,
  onSubmit,
  joke
}) => (
  <Box component="form" onSubmit={onSubmit}>
    <FormControl fullWidth variant="outlined">
      <TextField
        id="title"
        name="title"
        label="Title"
        sx={paddingStyle}
        defaultValue={joke ? joke.title : undefined}
        required
      />
      <TextField
        id="body"
        name="body"
        label="Body"
        sx={paddingStyle}
        multiline
        rows={10}
        defaultValue={joke ? joke.body : undefined}
        required
      />
    </FormControl>
    <Button
      variant="contained"
      type="submit"
      size="large"
      disabled={isLoading}
    >
      {joke ? 'Save' : 'Submit'}
    </Button>
  </Box>
);

export default JokeForm;
