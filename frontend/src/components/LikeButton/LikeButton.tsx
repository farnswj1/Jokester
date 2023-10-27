import { ChangeEvent, FC, useState } from 'react';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { APIService } from 'services';
import { Joke } from 'types';

interface LikeButtonProps extends CheckboxProps {
  joke: Joke;
}

const LikeButton: FC<LikeButtonProps> = ({ joke, defaultChecked, ...rest }) => {
  const [checked, setChecked] = useState<boolean>(Boolean(defaultChecked));
  const [count, setCount] = useState<number>(joke.total_likes);

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    const id = joke.id;
    const liked_by = event.target.checked;
    const data = { id, liked_by };

    APIService.put(`/api/jokes/${id}/like/`, data)
      .then(() => {
        setChecked(liked_by);
        setCount(count => count + (liked_by ? 1 : -1));
      });
  };

  return (
    <FormControlLabel
      label={count}
      control={
        <Checkbox
          {...rest}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={checked}
          onChange={handleClick}
        />
      }
    />
  );
};

export default LikeButton;
