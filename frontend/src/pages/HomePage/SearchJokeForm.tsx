import { FC, FormEventHandler } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchJokeFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>
}

const SearchJokeForm: FC<SearchJokeFormProps> = ({ onSubmit }) => (
  <Box component="form" onSubmit={onSubmit}>
    <TextField
      id="title"
      name="title"
      label="Search jokes"
      variant="outlined"
      color="secondary"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton color="secondary" type="submit">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  </Box>
);

export default SearchJokeForm;
