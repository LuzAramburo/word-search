import { useWordSearchContext, useWordSearchDispatch } from '@/context/WordSearchContext.tsx';
import { Navbar } from '@/components/UI/Navbar.tsx';
import { Outlet } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  const { gameState, collectedLetters } = useWordSearchContext();
  const dispatch = useWordSearchDispatch();

  const mouseDownHandler = () => {
    if (gameState === 'collecting') dispatch({ type: 'resetCollecting' });
  };

  const mouseUpHandler = () => {
    if (collectedLetters.length > 0) dispatch({ type: 'checkMatches' });
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
        </div>
      </main>
    </>
  );
}

export default Layout;
