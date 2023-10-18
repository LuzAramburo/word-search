import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { WordSearchProvider } from '@/context/WordSearchContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from '@/views/Game.tsx';
import Layout from '@/views/Layout.tsx';
import ErrorPage from '@/views/ErrorPage.tsx';
import JoinTournament from '@/views/JoinTournament.tsx';

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
    <WordSearchProvider>
      <RouterProvider router={router} />
    </WordSearchProvider>
  </React.StrictMode>,
);
