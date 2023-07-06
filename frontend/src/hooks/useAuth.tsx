import { useContext } from 'react';
import { AuthenticationContext } from 'contexts';

const useAuth = () => useContext(AuthenticationContext);

export default useAuth;
