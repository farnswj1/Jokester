import { FC, FormEventHandler } from 'react';
import {
  Box,
  FormControl,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchJokeFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>
}

const SearchJokeForm: FC<SearchJokeFormProps> = ({ onSubmit }) => (
  <Box component="form" onSubmit={onSubmit}>
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
