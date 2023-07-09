import { FC, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from 'contexts';
import TokenHandler from './TokenHandler';
import { Credentials } from 'types';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = TokenHandler.getUser();

  const login = (credentials: Credentials) => {
    TokenHandler.set(credentials);
    const path = location.state?.from?.pathname || '/';
    navigate(path);
  };

  const logout = () => {
    TokenHandler.delete();
  };

  const values = {
    user,
    login,
    logout
  };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthProvider;
