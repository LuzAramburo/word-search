import { Grid } from '@/components/grid/Grid';
import { WordList } from '@/components/wordList/WordList';
import { useWordSearchContext } from '@/context/WordSearchContext.tsx';
import { GameSettingsDialog } from '@/components/UI/GameSettingsDialog.tsx';
import { WinnerDialog } from '@/components/UI/WinnerDialog.tsx';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { confettiOptions } from '@/utils/confettiOptions.ts';
import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';

function Game() {
  const { gameState, wordList } = useWordSearchContext();

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
        <WordList wordsList={wordList} />
        <Grid />
      </div>
      <GameSettingsDialog />
      <WinnerDialog />
    </>
  );
}

export default Game;
