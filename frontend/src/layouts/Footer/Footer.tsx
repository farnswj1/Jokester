import { FC } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

const year = new Date().getFullYear();

const Footer: FC = () => (
  <Paper component="footer" square>
    <Container maxWidth="lg">
      <Box paddingY={2} textAlign="center">
        <Typography>
          &copy; {year} Justin Farnsworth
        </Typography>
      </Box>
    </Container>
  </Paper>
);

export default Footer;
