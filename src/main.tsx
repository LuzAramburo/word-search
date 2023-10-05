import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WordSearchProvider } from '@/context/WordSearchContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WordSearchProvider>
      <App />
    </WordSearchProvider>
  </React.StrictMode>,
);
