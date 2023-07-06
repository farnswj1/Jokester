import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element,
  test: CallableFunction,
  redirect?: string
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  test,
  redirect = '/'
}) => {
  const location = useLocation();
  return test() ? children : <Navigate to={redirect} replace state={{ from: location }} />;
};

export default ProtectedRoute;
