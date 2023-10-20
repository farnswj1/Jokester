import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Container } from '@mui/material';
import { ButtonLink } from 'components';
import { useAuth } from 'hooks';

const Header: FC = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar component="header" position="sticky" enableColorOnDark>
      <Container maxWidth="lg">
        <Toolbar
          component={Stack}
          direction="row"
          justifyContent="space-between"
          disableGutters
        >
          <Typography component={Link} variant="h6" to="/">
            Jokester
          </Typography>
          <Stack direction="row" spacing={1}>
            <ButtonLink color="inherit" to="/jokes/random">
              Random
            </ButtonLink>
            <ButtonLink color="inherit" to="/about">
              About
            </ButtonLink>
            {
              user ? ([
                <ButtonLink
                  key={0}
                  color="inherit"
                  to={`/users/${user.id}`}
                >
                  Profile
                </ButtonLink>,
                <ButtonLink
                  key={1}
                  color="inherit"
                  to="/"
                  onClick={() => logout()}
                >
                  Logout
                </ButtonLink>
              ]) : ([
                <ButtonLink key={0} color="inherit" to="/register">
                  Register
                </ButtonLink>,
                <ButtonLink key={1} color="inherit" to="/login">
                  Login
                </ButtonLink>
              ])
            }
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
