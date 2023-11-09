import { Navbar } from '@/components/navbar/Navbar.tsx';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useEffect } from 'react';
import { checkMatch, stopCollecting } from '@/store/gameSlice.ts';
import { Notifications } from '@/components/ui/Notifications/Notifications.tsx';

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
        <Notifications />
      </main>
    </>
  );
}

export default Layout;
