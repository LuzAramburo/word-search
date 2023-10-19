import { Navbar } from '@/components/UI/Navbar.tsx';
import { Outlet } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useEffect } from 'react';
import { checkMatch, init, stopCollecting } from '@/store/gameSlice.ts';

// const app = initializeApp({
//   apiKey: 'AIzaSyB6uHnhocwg15ubmiBGnrr0Vz3NIb28how',
//   authDomain: 'word-soup-71429.firebaseapp.com',
//   databaseURL: 'https://word-soup-71429-default-rtdb.firebaseio.com',
//   projectId: 'word-soup-71429',
//   storageBucket: 'word-soup-71429.appspot.com',
//   messagingSenderId: '126585871128',
//   appId: '1:126585871128:web:9f9112f344899381cbdc6d',
// });
// const auth = getAuth(app);

function Layout() {
  const dispatch = useAppDispatch();

  const { gameState, collectedLetters } = useAppSelector(state => state.game);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const mouseDownHandler = () => {
    if (gameState === 'collecting') dispatch(stopCollecting());
  };

  const mouseUpHandler = () => {
    if (collectedLetters.length > 0) dispatch(checkMatch());
  };

  if (gameState === 'loading') return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span className="loading loading-bars loading-lg" />
    </div>
  );

  return (
    <>
      <main
        className="w-screen h-screen"
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      >
        <div className="p-4 max-w-screen-2xl mx-auto min-h-screen">
          <Navbar />
          <Outlet />
          {gameSettingsDialog && <GameSettingsDialog/>}
          {winnerDialog && <WinnerDialog/>}
        </div>
      </main>
    </>
  );
}

export default Layout;
