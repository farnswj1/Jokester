import { createContext, MouseEventHandler } from 'react';
import { User } from 'auth';

interface AuthenticationContextProps {
  user: User | null,
  login: CallableFunction,
  logout: MouseEventHandler<HTMLSpanElement>
}

const defaultValues: AuthenticationContextProps = {
  user: null,
  login: () => {},
  logout: () => {}
};

const AuthenticationContext = createContext<AuthenticationContextProps>(defaultValues);

export default AuthenticationContext;
