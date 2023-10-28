import { Navbar } from '@/components/navbar/Navbar.tsx';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useEffect } from 'react';
import { checkMatch, init, stopCollecting } from '@/store/gameSlice.ts';

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
        </div>
      </main>
    </>
  );
}

export default Layout;
