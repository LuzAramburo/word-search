import { useWordSearchContext, useWordSearchDispatch } from '@/context/WordSearchContext.tsx';
import { Dialog } from '@/components/UI/Dialog.tsx';

export const WinnerDialog = () => {
  const { winnerDialog } = useWordSearchContext();
  const dispatch = useWordSearchDispatch();

  const resetGame = () => {
    dispatch({ type: 'restartGame' });
  };

  return (
    <Dialog open={winnerDialog}>
      <div className="text-center">
        <h1 className="font-bold text-2xl">You Won!</h1>
        <p className="py-4">Congratulations</p>
        <button className="btn btn-primary" onClick={resetGame}>Play again?</button>
      </div>
    </Dialog>
  );
};
