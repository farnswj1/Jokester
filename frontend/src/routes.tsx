import { FC, Suspense, lazy } from 'react';
import { Routes as BrowserRoutes, Route } from 'react-router-dom';
import { LoadingScreen, ProtectedRoute } from 'components';
import { useRouteGuard } from 'hooks';

const AboutPage = lazy(() => import('pages/AboutPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const JokeDetailPage = lazy(() => import('pages/JokeDetailPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const NewJokePage = lazy(() => import('pages/NewJokePage'));
const PageNotFoundPage = lazy(() => import('pages/PageNotFoundPage'));
const RandomJokePage = lazy(() => import('pages/RandomJokePage'));
const RegisterUserPage = lazy(() => import('pages/RegisterUserPage'));
const UpdateJokePage = lazy(() => import('pages/UpdateJokePage'));
const UpdatePasswordPage = lazy(() => import('pages/UpdatePasswordPage'));
const UpdateUserPage = lazy(() => import('pages/UpdateUserPage'));
const UserProfilePage = lazy(() => import('pages/UserProfilePage'));

const Routes: FC = () => {
  const { useIsUser } = useRouteGuard();

  return (
    <Suspense fallback={<LoadingScreen />}>
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
    </Suspense>
  );
};

export default Routes;
