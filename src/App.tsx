import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/pages/Layout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import Game from '@/pages/Game.tsx';
import TournamentLanding from '@/pages/TournamentLanding.tsx';
import { TournamentCreate } from '@/pages/TournamentCreate.tsx';
import { TournamentID } from '@/pages/TournamentID.tsx';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute.tsx';
import Auth from '@/components/auth/Auth.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Game />,
      },
      {
        path: '/login',
        element: <Auth />,
      },
    ],
  },
  {
    path: '/tournament',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/tournament',
        element: <TournamentLanding />,
      },
      {
        path: '/tournament/create',
        element: <TournamentCreate />,
      },
      // TODO id always in uppercase
      // TODO redirect to join screen if you add id directly
      // TODO you can't join if already started
      {
        path: '/tournament/:id',
        element: <TournamentID />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <RouterProvider router={router} />
  );
};
