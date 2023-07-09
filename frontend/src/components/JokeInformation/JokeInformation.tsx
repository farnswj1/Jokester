import { Divider, Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import { headerStyle, paddingStyle, verticalPaddingStyle } from 'utils';
import { Joke } from 'types';
import { Link } from 'react-router-dom';

interface JokeInformationProps {
  joke: Joke
}

const JokeInformation: FC<JokeInformationProps> = ({ joke }) => (
  <Fragment>
    <Typography variant="h4" sx={headerStyle}>
      {joke.title}
    </Typography>
    {
      joke.body.split(/\n+/g).map((text, index) => (
        <Typography key={index} sx={paddingStyle} paragraph>
          {text}
        </Typography>
      ))
    }
    <Divider sx={verticalPaddingStyle} />
    <Typography variant="subtitle1">
      {'This joke was created by '}
      {
        joke.author ? (
          <Link to={`/users/${joke.author.id}`}>
            {joke.author.username}
          </Link>
        ) : (
          '[DELETED]'
        )
      }
    </Typography>
  </Fragment>
);

export default JokeInformation;
