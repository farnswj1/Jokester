import { useParams } from 'react-router-dom';
import { TokenHandler } from 'auth';
import { useAuth } from 'hooks';

const useIsAuthenticated = () => {
  const access = TokenHandler.getAccess();
  return Boolean(access);
};

const useIsUnauthenticated = () => {
  const access = TokenHandler.getAccess();
  return !Boolean(access);
};

const useIsUser = () => {
  const { user } = useAuth();
  const { id } = useParams();
  return user?.id === id;
};

const useIsAdmin = () => {
  const { user } = useAuth();
  return user?.hasGroup('Administrators');
};

const useHasAccessToUser = () => {
  const { user } = useAuth();
  const { id } = useParams();
  return user?.hasGroup('Administrators') || user?.id === id;
};

const routeGuards = {
  useIsAuthenticated,
  useIsUnauthenticated,
  useIsUser,
  useIsAdmin,
  useHasAccessToUser
};

const useRouteGuard = () => routeGuards;

export default useRouteGuard;
