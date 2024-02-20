import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AuthenticationContext } from 'contexts';
import { TokenHandler } from 'features';
import { Credentials } from 'types';

interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [credentials, setCredentials] = useState<Credentials | null>(TokenHandler.get());
  const user = useMemo(() => TokenHandler.getUser(), [credentials]);

  const login = (credentials: Credentials) => {
    TokenHandler.set(credentials);
    setCredentials(credentials);
  };

  const logout = () => {
    TokenHandler.delete();
    setCredentials(null);
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
