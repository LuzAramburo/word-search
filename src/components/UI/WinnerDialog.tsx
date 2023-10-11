import { useEffect, useRef } from 'react';
import { useWordSearchContext, useWordSearchDispatch } from '@/context/WordSearchContext.tsx';

export const WinnerDialog = () => {
  const { refs } = useWordSearchContext();
  const dispatch = useWordSearchDispatch();
  const winnerDialog = useRef(null);

  useEffect(() => {
    dispatch({ type: 'setRef', payload: { name: 'winnerDialog', element: winnerDialog.current } });
  }, [winnerDialog, dispatch, refs.winnerDialog]);

  const resetGame = () => {
    dispatch({ type: 'restartGame' });
    refs.winnerDialog?.close();
  };

  return (
    <dialog ref={winnerDialog} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="text-center">
          <h1 className="font-bold text-2xl">You Won!</h1>
          <p className="py-4">Congratulations</p>
          <button className="btn btn-primary" onClick={resetGame}>Play again?</button>
        </div>
      </div>
    </dialog>
  );
};
