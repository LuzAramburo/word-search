import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import SingleGame from './pages/SingleGame.tsx';
import Auth from './components/auth/Auth.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import TournamentLanding from './pages/TournamentLanding.tsx';
import TournamentCreate from './pages/TournamentCreate.tsx';
import TournamentID from './pages/TournamentID.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <SingleGame/>,
      },
      {
        path: '/login',
        element: <Auth/>,
      },
    ],
  },
  {
    path: '/tournament',
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/tournament',
        element: <TournamentLanding/>,
      },
      {
        path: '/tournament/create',
        element: <TournamentCreate/>,
      },
      {
        path: '/tournament/:id',
        element: <TournamentID/>,
      },
    ],
  },
]);
