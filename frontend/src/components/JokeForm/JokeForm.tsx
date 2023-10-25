import { FC, FormEventHandler } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Joke } from 'types';

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
  <Stack component="form" spacing={3} onSubmit={onSubmit}>
    <TextField
      id="title"
      name="title"
      label="Title"
      variant="outlined"
      defaultValue={joke ? joke.title : undefined}
      fullWidth
      required
    />
    <TextField
      id="body"
      name="body"
      label="Body"
      variant="outlined"
      multiline
      rows={10}
      defaultValue={joke ? joke.body : undefined}
      fullWidth
      required
    />
    <Box>
      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : (joke ? 'Save' : 'Submit')}
      </Button>
    </Box>
  </Stack>
);

export default JokeForm;
