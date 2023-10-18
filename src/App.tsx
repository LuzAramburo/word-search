import './App.css';
import { Grid } from '@/components/grid/Grid';
import { WordList } from '@/components/wordList/WordList';
import {
  useWordSearchContext, useWordSearchDispatch
} from '@/context/WordSearchContext.tsx';
import { Navbar } from '@/components/UI/Navbar.tsx';
import { GameSettingsDialog } from '@/components/UI/GameSettingsDialog.tsx';
import { WinnerDialog } from '@/components/UI/WinnerDialog.tsx';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { confettiOptions } from '@/utils/confettiOptions.ts';
import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';

function App() {
  const { gameState, wordList, collectedLetters } = useWordSearchContext();
  const dispatch = useWordSearchDispatch();

  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  const mouseDownHandler = () => {
    if (gameState === 'collecting') dispatch({ type: 'resetCollecting' });
  };

  const mouseUpHandler = () => {
    if (collectedLetters.length > 0) dispatch({ type: 'checkMatches' });
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
      <main
        className="w-screen h-screen"
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      >
        <div className="p-4 max-w-screen-2xl mx-auto min-h-screen">
          <Navbar />
          <div className="grid grid-cols-5 gap-4">
            <WordList wordsList={wordList} />
            <Grid />
          </div>
        </div>
        <GameSettingsDialog />
        <WinnerDialog />
      </main>
    </>
  );
}

export default App;
