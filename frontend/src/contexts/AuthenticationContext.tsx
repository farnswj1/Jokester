import { createContext } from 'react';
import { User } from 'features';

interface AuthenticationContextProps {
  user: User | null;
  login: CallableFunction;
  logout: CallableFunction;
}

const defaultValues: AuthenticationContextProps = {
  user: null,
  login: () => {},
  logout: () => {}
};

const AuthenticationContext = createContext<AuthenticationContextProps>(defaultValues);

export default AuthenticationContext;
