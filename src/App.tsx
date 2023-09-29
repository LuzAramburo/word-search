import './App.css';
import { Grid } from './components/grid/Grid';
import { WordList } from './components/wordList/WordList';
import { useState } from 'react';

const myWords = ['Eggs', 'Milk', 'Butter', 'Oats', 'Sugar', 'Bread', 'Rusk'];
const gridSize = 12;
const matrixFactory = (): null[][] => new Array(gridSize).fill(Array(gridSize).fill(null));

function App() {
  const [wordsList, setWordsList] = useState(myWords);
  const [gridMatrix, setGridMatrix] = useState(matrixFactory());

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold underline mb-6">
        Word Search
      </h1>
      <div className="grid grid-cols-5 gap-4">
        <WordList wordsList={wordsList} />
        <Grid matrix={gridMatrix} wordsList={wordsList} />
      </div>
    </main>
  );
}

export default App;
