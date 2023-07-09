import { FC } from 'react';
import { ErrorTypography } from 'components';

const ServerErrorMessage: FC = () => (
  <ErrorTypography>
    There was an error with the server!
  </ErrorTypography>
);

export default ServerErrorMessage;
