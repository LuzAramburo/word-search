import { Grid } from '@/components/grid/Grid';
import { WordList } from '@/components/wordList/WordList';
import { GameSettingsDialog } from '@/components/ui/GameSettingsDialog.tsx';
import { WinnerDialog } from '@/components/ui/WinnerDialog.tsx';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { confettiOptions } from '@/utils/confettiOptions.ts';
import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';
import { useAppSelector } from '@/store/hooks.ts';

function Game() {
  const gameState= useAppSelector(state => state.game.gameState);

  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

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
      <GameSettingsDialog />
      <WinnerDialog />
    </>
  );
}

export default Game;
