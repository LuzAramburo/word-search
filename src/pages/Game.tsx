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

function Game() {
  const { gameState, gameSettingsDialog, winnerDialog }= useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  const resetGame = () => {
    dispatch(restartGame());
  };

  if (gameState === 'loading') return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span className="loading loading-bars loading-lg" />
    </div>
  );

  return (
    <>
      { gameState === 'winner' &&<Particles
        init={particlesInit}
        options={confettiOptions}
      />}
      <div className="grid grid-cols-5 gap-4">
        <WordList/>
        <Grid />
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

export default Game;
