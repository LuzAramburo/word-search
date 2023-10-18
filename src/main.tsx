import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from '@/views/Game.tsx';
import Layout from '@/views/Layout.tsx';
import ErrorPage from '@/views/ErrorPage.tsx';
import JoinTournament from '@/views/JoinTournament.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
