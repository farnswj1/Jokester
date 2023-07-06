import { FC } from 'react';
import { Box, FormControl, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchJokeFormProps {
  handleSubmit: CallableFunction
}

const SearchJokeForm: FC<SearchJokeFormProps> = ({ handleSubmit }) => (
  <Box component="form" onSubmit={() => handleSubmit()}>
    <FormControl fullWidth variant="outlined">
      <TextField
        id="title"
        name="title"
        label="Search jokes"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  </Box>
);

export default SearchJokeForm;
