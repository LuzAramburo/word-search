import { IGridItem } from '@/types/IGrid.ts';
import { IWord } from '@/types/IWord.ts';

const POSITIONS = {
  ROW: 'row',
  COLUMN: 'column',
  DIAGONAL: 'diagonal',
};

const testWord = (
  grid: IGridItem[],
  gridSize: number,
  word: string,
  cell: IGridItem,
  direction: string,
): IGridItem[] | null => {
  const newGrid = [...grid];

  if(newGrid[cell.position].letter === word.slice(0, 1) || newGrid[cell.position].letter === '' ) {

    if (direction === POSITIONS.ROW && (cell.col + word.length) <= gridSize) {
      let startingCell = cell.position;
      for (const letter of word) {
        if (newGrid[startingCell].letter !== '' && newGrid[startingCell].letter !== letter) return null;
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter };
        startingCell = startingCell + 1;
      }
      return newGrid;
    }

    if (direction === POSITIONS.COLUMN && (cell.row + word.length) <= gridSize) {
      let startingCell = cell.position;
      for (const letter of word) {
        if (newGrid[startingCell].letter !== '' && newGrid[startingCell].letter !== letter) return null;
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter };
        startingCell = startingCell + gridSize;
      }
      return newGrid;
    }

    if (
      direction === POSITIONS.DIAGONAL
      && (cell.col + word.length) <= gridSize
      && (cell.row + word.length) <= gridSize
    ) {
      let startingCell = cell.position;
      for (const letter of word) {
        if (newGrid[startingCell].letter !== '' && newGrid[startingCell].letter !== letter) return null;
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter };
        startingCell = startingCell + gridSize + 1;
      }
      return newGrid;
    }

  }
  return null;
};

const placeWords = (gridMatrix: IGridItem[], wordList: string[], gridSize: number) => {
  const positions = [POSITIONS.ROW, POSITIONS.COLUMN, POSITIONS.DIAGONAL];
  let updatedGrid = [...gridMatrix];

  for (let i = 0; i < wordList.length; i++) {
    if ( i === wordList.length) continue;
    const word = wordList[i];
    let wordPlaced = false;
    const maxAttempts = 3;
    let attempts = 0; // Initialize attempt counter

    while (!wordPlaced && attempts < maxAttempts) {
      const orientation = positions[Math.floor(Math.random() * positions.length)];
      const startingPosition = Math.floor(Math.random() * gridMatrix.length);

      const cellFormatted = { ...updatedGrid[startingPosition], orientation };

      const grid = testWord(updatedGrid, gridSize, word, cellFormatted, orientation);

      if (grid !== null) {
        updatedGrid = grid;
        wordPlaced = true;
      } else {
        attempts++;
      }
    }
  }

  // INFO: 0x00D1 Ñ
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  for (let position = 0; position < updatedGrid.length; position++) {
    if (updatedGrid[position].letter === '') {
      updatedGrid[position] = {
        ...updatedGrid[position],
        letter:  import.meta.env.VITE_DEBUG_GRID
          ? 'x'
          : letters[Math.floor(Math.random() * letters.length)] };
    }
  }
  return updatedGrid;
};

export const gridFactory = (gridSize: number, wordList: IWord[]) => {
  const emptyGrid: null[][] = new Array(gridSize * gridSize).fill(null);
  const grid: IGridItem[] = emptyGrid.map((_item, itemIndex) =>  {
    return {
      letter: '',
      position: itemIndex,
      row: Math.floor(itemIndex / gridSize),
      col: itemIndex % gridSize,
      orientation: '',
      collected: false,
      used: false,
    };
  });

  const wordListStrings = wordList.map(item => item.word);

  return placeWords(grid, wordListStrings, gridSize);
};
