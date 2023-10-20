import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material';
import {
  ErrorTypography,
  HeaderTypography,
  LoadingBar,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle } from 'utils';

const UpdatePasswordPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  setTitle(`Update User #${id}`);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <Container maxWidth="sm">
      <Stack spacing={3}>
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
            <Stack component="form" spacing={3} onSubmit={handleSubmit}>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                name="confirm_password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
                required
              />
              <FormControlLabel
                label="I acknowledge that I am changing my password."
                control={
                  <Checkbox
                    name="acknowledged"
                    onChange={handleInputChange}
                    required
                  />
                }
              />
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading || disableSubmit}
                >
                  Save
                </Button>
              </Box>
            </Stack>
          )
        }
      </Stack>
    </Container>
  );
};

export default UpdatePasswordPage;
