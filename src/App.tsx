import './App.css';
import { Grid } from './components/grid/Grid';
import { WordList } from './components/wordList/WordList';
import { useContext, useState } from 'react';
import { gridFactory } from '@/utils/gridFactory.ts';
import {
  WordSearchContext
} from '@/context/WordSearchContext.tsx';

const myWords = ['Eggs', 'Milk', 'Butter', 'Oats', 'Sugar', 'Rusk', 'Chocolate'];
const gridSize = 12;

function App() {
  const [wordsList, setWordsList] = useState(myWords);
  const [gridMatrix, setGridMatrix] = useState(gridFactory(gridSize, myWords));
  const state = useContext(WordSearchContext);

  return (
    <main className="p-4 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold underline mb-6">
            Word Search
      </h1>
      <h4>gameState {state?.gameState}</h4>
      <div className="grid grid-cols-5 gap-4">
        <WordList wordsList={wordsList} />
        <Grid grid={gridMatrix} />
      </div>
    </main>
  );
}

export default App;
