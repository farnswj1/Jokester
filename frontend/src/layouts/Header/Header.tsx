import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { useAuth } from 'hooks';

const Header: FC = () => {
  const { user, logout } = useAuth();
  const mr3 = { mr: 3 };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            <Link to="/">
              Jokes API
            </Link>
          </Typography>
          <Typography sx={mr3}>
            <Link to="/jokes/random">
              Random
            </Link>
          </Typography>
          <Typography sx={mr3}>
            <Link to="/about">
              About
            </Link>
          </Typography>
          {
            user ? (
              <Typography onClick={() => logout()}>
                <Link to="/">Logout</Link>
              </Typography>
            ) : (
              <Typography>
                <Link to="/login">Login</Link>
              </Typography>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
