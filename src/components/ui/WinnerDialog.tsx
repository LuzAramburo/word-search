import { Dialog } from '@/components/ui/Dialog.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { restartGame } from '@/store/gameSlice.ts';

export const WinnerDialog = () => {
  const winnerDialog = useAppSelector(state => state.game.winnerDialog);
  const dispatch = useAppDispatch();

  const resetGame = () => {
    dispatch(restartGame());
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
