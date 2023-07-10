import { FC, FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField
} from '@mui/material';
import {
  ErrorTypography,
  HeaderTypography,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { paddingStyle, setTitle } from 'utils';

const UpdatePasswordPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  setTitle(`Update User #${id}`);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target.name;
    const acknowledgedInputElement = document.querySelector('[name="acknowledged"]') as HTMLInputElement;
    let passwordElement: HTMLInputElement;
    let confirmPasswordElement: HTMLInputElement;

    if (element === 'password') {
      confirmPasswordElement = document.querySelector('[name="confirm_password"]') as HTMLInputElement;
      passwordElement = event.target;
    } else if (element ==='confirm_password') {
      passwordElement = document.querySelector('[name="password"]') as HTMLInputElement;
      confirmPasswordElement = event.target;
    } else {
      passwordElement = document.querySelector('[name="password"]') as HTMLInputElement;
      confirmPasswordElement = document.querySelector('[name="confirm_password"]') as HTMLInputElement;
    }

    const passwordValue = passwordElement.value;
    const confirmPasswordValue = confirmPasswordElement.value;

    setDisableSubmit(
      !acknowledgedInputElement.checked
        || !passwordValue
        || !confirmPasswordValue
        || (passwordValue !== confirmPasswordValue)
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const data = new FormData(event.currentTarget);
    data.delete('confirm_password');
    data.delete('acknowledged');

    APIService.put(`/api/users/password/${id}/`, data)
      .then(({ status }) => {
        setStatus(status);
        navigate(`/users/${id}`);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageContainer maxWidth="sm">
      <HeaderTypography>
        Update Password
      </HeaderTypography>
      {
        isLoading && (
          <LoadingBar />
        )
      }
      {
        (status && status >= 500) && (
          <ServerErrorMessage />
        )
      }
      {
        status === 400 && (
          <ErrorTypography>
            Please double check your inputs.
          </ErrorTypography>
        )
      }
      {
        user && (
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="password"
                name="password"
                label="Password"
                sx={paddingStyle}
                onChange={handleInputChange}
                required
              />
              <TextField
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                type="password"
                sx={paddingStyle}
                onChange={handleInputChange}
                required
              />
              <FormControlLabel
                label="Label"
                control={<Checkbox name="acknowledged" onChange={handleInputChange} />}
                sx={paddingStyle}
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={isLoading || disableSubmit}
            >
              Save
            </Button>
          </Box>
        )
      }
    </PageContainer>
  );
};

export default UpdatePasswordPage;
