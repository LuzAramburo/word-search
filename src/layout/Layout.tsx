import { Navbar } from '@/components/navbar/Navbar.tsx';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useEffect } from 'react';
import { checkMatch, stopCollecting } from '@/store/gameSlice.ts';
import { Notifications } from '@/components/Notifications/Notifications.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/libs/firebase.ts';
import { clearUser, setUser } from '@/store/userSlice.ts';
import { primaryInput } from 'detect-it';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

function Layout() {
  const dispatch = useAppDispatch();

  const { gameState, collectedLetters } = useAppSelector(state => state.game);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        const displayName= uniqueNamesGenerator({
          dictionaries: [colors, animals],
          length: 2,
          separator: ' ',
        });
        dispatch(
          setUser({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName ?? displayName,
            avatar: userAuth.photoURL ?? 'https://api.dicebear.com/9.x/pixel-art/svg',
          }),
        );
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  const mouseDownHandler = () => {
    if (gameState === 'collecting' && primaryInput === 'mouse') dispatch(stopCollecting());
  };

  const mouseUpHandler = () => {
    if (primaryInput === 'mouse' && gameState !== 'winner') checkMatchHandler();
  };

  const touchEndHandler = () => {
    if (primaryInput === 'touch' && gameState !== 'winner') checkMatchHandler();
  };

  const checkMatchHandler = () => {
    if (collectedLetters.length > 0 && gameState !== 'winner') dispatch(checkMatch());
  };

  return (
    <>
      <main
        className="w-screen h-screen"
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onTouchEnd={touchEndHandler}
      >
        <div className="p-4 max-w-screen-2xl mx-auto min-h-screen">
          <Navbar />
          <Outlet />
        </div>
        <Notifications />
      </main>
    </>
  );
}

export default Layout;
