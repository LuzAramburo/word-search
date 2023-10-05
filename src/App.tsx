import './App.css';
import { Grid } from './components/grid/Grid';
import { WordList } from './components/wordList/WordList';
import { useContext } from 'react';
import {
  WordSearchContext
} from '@/context/WordSearchContext.tsx';
import { Loading } from '@/components/UI/Loading.tsx';

function App() {
  const wordSearchContext = useContext(WordSearchContext);

  if (!wordSearchContext) return <Loading />;

  const { gameState, grid, wordList } = wordSearchContext;

  return (
    <main className="p-4 max-w-screen-2xl mx-auto">
      <h4 className="bg-blue-200 text-lg px-4">{gameState}</h4>
      <h1 className="text-3xl font-bold underline mb-6">
            Word Search
      </h1>
      <div className="grid grid-cols-5 gap-4">
        <WordList wordsList={wordList} />
        <Grid grid={grid} />
      </div>
    </main>
  );
}

export default App;
