import { FC, MouseEvent, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ButtonLink, RouterLink } from 'components';
import { useAuth } from 'hooks';
import Logo from 'assets/images/logo.png';

const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { user, logout } = useAuth();
  const openMenu = Boolean(anchorEl);

  const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorEl(null);

  return (
    <AppBar component="header" position="sticky" enableColorOnDark>
      <Container maxWidth="lg">
        <Toolbar
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          disableGutters
        >
          <Stack
            component={RouterLink}
            direction="row"
            spacing={1}
            alignItems="center"
            color="inherit"
            underline="none"
            to="/"
          >
            <Box
              component="img"
              src={Logo}
              maxWidth={32}
              maxHeight="auto"
            />
            <Typography variant="h6">
              Jokester
            </Typography>
          </Stack>
          <Box display={{ xs: 'flex', sm: 'none' }}>
            <IconButton
              size="large"
              color="inherit"
              aria-controls="navbar-content"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="navbar-content"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
            >
              <MenuItem
                component={RouterLink}
                to="/jokes/random"
                underline="none"
                onClick={handleCloseNavMenu}
              >
                Random
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/about"
                underline="none"
                onClick={handleCloseNavMenu}
              >
                About
              </MenuItem>
              {
                user ? ([
                  <MenuItem
                    key={0}
                    component={RouterLink}
                    to={`/users/${user.id}`}
                    underline="none"
                    onClick={handleCloseNavMenu}
                  >
                    Profile
                  </MenuItem>,
                  <MenuItem
                    key={1}
                    component={RouterLink}
                    to="/"
                    underline="none"
                    onClick={() => { logout(); handleCloseNavMenu(); }}
                  >
                    Logout
                  </MenuItem>
                ]) : ([
                  <MenuItem
                    key={0}
                    component={RouterLink}
                    to="/register"
                    underline="none"
                    onClick={handleCloseNavMenu}
                  >
                    Register
                  </MenuItem>,
                  <MenuItem
                    key={1}
                    component={RouterLink}
                    to="/login"
                    underline="none"
                    onClick={handleCloseNavMenu}
                  >
                    Login
                  </MenuItem>
                ])
              }
            </Menu>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            display={{ xs: 'none', sm: 'flex' }}
          >
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
