import { FC } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box sx={{ mt: 'auto' }}>
      <AppBar position="relative">
        <Toolbar sx={{ mx: 'auto' }}>
          <Box>
            <Typography>
              &copy; {year} Justin Farnsworth
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
