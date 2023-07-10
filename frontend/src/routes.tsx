import { FC } from 'react';
import { Routes as BrowserRoutes, Route } from 'react-router-dom';
import {
  AboutPage,
  HomePage,
  JokeDetailPage,
  LoginPage,
  NewJokePage,
  PageNotFoundPage,
  RandomJokePage,
  RegisterUserPage,
  UpdateJokePage,
  UpdatePasswordPage,
  UpdateUserPage,
  UserProfilePage
} from 'pages';
import { ProtectedRoute } from 'components';
import { useRouteGuard } from 'hooks';

const Routes: FC = () => {
  const { useIsUser } = useRouteGuard();

  return (
    <BrowserRoutes>
      <Route
        path="/about"
        element={<AboutPage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/register"
        element={<RegisterUserPage />}
      />
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/jokes/new"
        element={<NewJokePage />}
      />
      <Route
        path="/jokes/random"
        element={<RandomJokePage />}
      />
      <Route
        path="/jokes/:id/update"
        element={<UpdateJokePage />}
      />
      <Route
        path="/jokes/:id"
        element={<JokeDetailPage />}
      />
      <Route
        path="/users/:id/update"
        element={<UpdateUserPage />}
      />
      <Route
        path="/users/:id/password"
        element={
          <ProtectedRoute test={useIsUser} redirect="/">
            <UpdatePasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={<UserProfilePage />}
      />
      <Route
        path="*"
        element={<PageNotFoundPage />}
      />
    </BrowserRoutes>
  );
};

export default Routes;
