import { Grid } from '@/components/grid/Grid';
import { WordList } from '@/components/wordList/WordList';
import { GameSettingsDialog } from '@/components/ui/GameSettingsDialog.tsx';
import { WinnerDialog } from '@/components/ui/WinnerDialog.tsx';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { confettiOptions } from '@/utils/confettiOptions.ts';
import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { restartGame } from '@/store/gameSlice.ts';
import { useGenerateGridQuery } from '@/store/gridApi.ts';

function SingleGame() {
  const { gameState, gameSettingsDialog, winnerDialog } = useAppSelector(state => state.game);
  const { error, isLoading } = useGenerateGridQuery({ subject: 'random' });
  const dispatch = useAppDispatch();

  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  const resetGame = () => {
    dispatch(restartGame());
  };

  if (isLoading) return (
    <div className="w-screen flex justify-center items-center p-8">
      <span className="loading loading-bars loading-lg" />
    </div>
  );

  if (error) return (
    <div className="w-screen flex justify-center items-center p-8">
      Error generating grid
    </div>
  );

  return (
    <>
      { gameState === 'winner' &&<Particles
        init={particlesInit}
        options={confettiOptions}
      />}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Grid />
        <WordList/>
      </div>
      {gameSettingsDialog && <GameSettingsDialog/>}
      {winnerDialog && <WinnerDialog
        title="You Won!"
        subtitle="Congratulations"
        btnText="Play again?"
        onConfirm={resetGame}
      />}
    </>
  );
}

export default SingleGame;
