import './App.css';
import { Grid } from './components/grid/Grid';
import { WordList } from './components/wordList/WordList';
import {
  useWordSearchContext, useWordSearchDispatch
} from '@/context/WordSearchContext.tsx';
import { CollectedLetters } from '@/components/CollectedLetters.tsx';

function App() {
  const wordSearchContext = useWordSearchContext();
  const { gameState, grid, wordList, collectedLetters } = wordSearchContext;
  const dispatch = useWordSearchDispatch();

  const clickHandler = () => {
    if(gameState === 'answering') dispatch({ type: 'resetCollecting' });
  };

  const mouseUpHandler = () => {
    if (collectedLetters.length > 0) dispatch({ type: 'setGameState', payload: 'answering' });
  };

  return (
    <main
      className="w-screen h-screen"
      onMouseDown={clickHandler}
      onMouseUp={mouseUpHandler}
    >
      <div className="p-4 max-w-screen-2xl mx-auto min-h-screen">
        <h4 className="bg-blue-200 text-lg px-4">
          {gameState}
        </h4>
        <h1 className="text-3xl font-bold underline mb-6">
          Word Search
        </h1>
        <div className="grid grid-cols-5 gap-4">
          <WordList wordsList={wordList} />
          <Grid grid={grid} />
        </div>
        {gameState !== 'idle' && <CollectedLetters/>}
      </div>
    </main>
  );
}

export default App;
