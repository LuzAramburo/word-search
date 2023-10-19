import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/pages/Layout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import Game from '@/pages/Game.tsx';
import JoinTournament from '@/pages/JoinTournament.tsx';
import { useEffect } from 'react';
import { auth } from '@/firebase.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { setLoading, setUser } from '@/store/userSlice.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Game/>,
      },
      {
        path: 'tournament',
        element: <JoinTournament/>,
      },
      {
        path: 'tournament/:id',
        element: <Game/>,
      },
    ],
  },
]);

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(setUser({
          email: authUser.email,
          uid: authUser.uid,
          displayName: authUser.displayName,
          avatar: authUser.photoURL,
        }));
      }
    });
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
};
