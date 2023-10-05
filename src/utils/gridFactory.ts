import { IGridItem } from '@/types/IGrid.tsx';

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
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter.toUpperCase(), color: 'lightblue' };
        startingCell = startingCell + 1;
      }
      return newGrid;
    }

    if (direction === POSITIONS.COLUMN && (cell.row + word.length) <= gridSize) {
      let startingCell = cell.position;
      for (const letter of word) {
        if (newGrid[startingCell].letter !== '' && newGrid[startingCell].letter !== letter) return null;
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter.toUpperCase(), color: 'lightgreen' };
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
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter.toUpperCase(), color: 'pink' };
        startingCell = startingCell + gridSize + 1;
      }
      return newGrid;
    }

  }
  return null;
};

const placeWords = (gridMatrix: IGridItem[], wordList: string[], gridSize: number) => {
  const positions = [POSITIONS.ROW, POSITIONS.COLUMN, POSITIONS.DIAGONAL];
  let newGrid = [...gridMatrix];

  for (const word of wordList) {
    let wordPlaced = false;
    while (!wordPlaced) {
      const orientation = positions[Math.floor(Math.random() * positions.length)];
      const startingPosition = Math.floor(Math.random() * gridMatrix.length);

      const cellFormatted = { ...newGrid[startingPosition], orientation };

      const grid = testWord(newGrid, gridSize, word, cellFormatted, orientation);

      if (grid !== null) {
        newGrid = grid;
        wordPlaced = true;
      }
    }
  }

  // 0x00D1 Ñ
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  for (let position = 0; position < newGrid.length; position++) {
    if (newGrid[position].letter === '') {
      newGrid[position] = { ...newGrid[position], letter: letters[Math.floor(Math.random() * letters.length)] };
    }
  }

  return newGrid;
};

export const gridFactory = (gridSize: number, wordList: string[]) => {
  const emptyGrid: null[][] = new Array(gridSize * gridSize).fill(null);
  const grid: IGridItem[] = emptyGrid.map((_item, itemIndex) =>  {
    return {
      letter: '',
      position: itemIndex,
      row: Math.floor(itemIndex / gridSize),
      col: itemIndex % gridSize,
      orientation: '',
    };
  });

  return placeWords(grid, wordList, gridSize);
};
