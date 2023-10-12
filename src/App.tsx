import './App.css';
import { Grid } from './components/grid/Grid';
import { WordList } from './components/wordList/WordList';
import {
  useWordSearchContext, useWordSearchDispatch
} from '@/context/WordSearchContext.tsx';
import { Navbar } from '@/components/UI/Navbar.tsx';
import { ConfigDialog } from '@/components/UI/ConfigDialog.tsx';
import { WinnerDialog } from '@/components/UI/WinnerDialog.tsx';

function App() {
  const { gameState, wordList, collectedLetters } = useWordSearchContext();
  const dispatch = useWordSearchDispatch();

  const mouseDownHandler = () => {
    if (gameState === 'collecting') dispatch({ type: 'resetCollecting' });
  };

  const mouseUpHandler = () => {
    if (collectedLetters.length > 0) dispatch({ type: 'checkMatches' });
  };

  const loadingView = (
    <div className="w-screen h-[60vh] flex justify-center items-center">
      <span className="loading loading-bars loading-lg" />
    </div>
  );

  return (
    <main
      className="w-screen h-screen"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      <div className="p-4 max-w-screen-2xl mx-auto min-h-screen">
        <Navbar />
        {gameState === 'loading' && loadingView}
        {gameState !== 'loading' && (
          <div className="grid grid-cols-5 gap-4">
            <WordList wordsList={wordList} />
            <Grid />
          </div>
        )}
        <h4 className="bg-blue-200 text-lg px-4 mt-4">
          {gameState}
        </h4>
      </div>
      <ConfigDialog />
      <WinnerDialog />
    </main>
  );
}

export default App;
