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
  UpdateJokePage,
  UserProfilePage
} from 'pages';

const Routes: FC = () => (
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
      path="/users/:id"
      element={<UserProfilePage />}
    />
    <Route
      path="*"
      element={<PageNotFoundPage />}
    />
  </BrowserRoutes>
);

export default Routes;
