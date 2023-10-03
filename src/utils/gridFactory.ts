import { IGridItem, IGridMatrix } from '@/types/IGridMatrix.tsx';

const POSITIONS = {
  ROW: 'row',
  COLUMN: 'column',
  DIAGONAL: 'diagonal',
};

const testWord = (
  grid: IGridMatrix,
  gridSize: number,
  word: string,
  cell: IGridItem,
  direction: string,
): IGridMatrix | null => {
  const newGrid = [...grid];

  if(grid[cell.position].letter === '' || grid[cell.position].letter === word.slice(0, 1)) {

    if (direction === POSITIONS.ROW && (cell.col + word.length) <= gridSize) {
      let startingCell = cell.position;
      for (const letter of word) {
        if (newGrid[startingCell].letter !== '' && newGrid[startingCell].letter !== letter) return null;
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter.toUpperCase() };
        startingCell = startingCell + 1;
      }
      return newGrid;
    }

    if (direction === POSITIONS.COLUMN && (cell.row + word.length) <= gridSize) {
      let startingCell = cell.position;
      for (const letter of word) {
        if (newGrid[startingCell].letter !== '' && newGrid[startingCell].letter !== letter) return null;
        newGrid[startingCell] = { ...newGrid[startingCell], letter: letter.toUpperCase() };
        startingCell = startingCell + gridSize;
      }
      return newGrid;
    }

  }
  return null;
};

const placeWords = (gridMatrix: IGridMatrix, wordList: string[], gridSize: number) => {
  const positions = [POSITIONS.ROW, POSITIONS.COLUMN];
  let newGrid = [...gridMatrix];

  for (const word of wordList) {
    let wordPlaced = false;
    while (!wordPlaced) {
      const orientation = positions[Math.floor(Math.random() * positions.length)];
      const startingPosition = Math.floor(Math.random() * gridMatrix.length);

      const cellFormatted = { ...newGrid[startingPosition], letter: word.slice(0, 1), orientation };

      const grid = testWord(newGrid, gridSize, word, cellFormatted, orientation);

      if (grid !== null) {
        newGrid = grid;
        wordPlaced = true;
      }
    }
  }

  return newGrid;
};

export const gridFactory = (gridSize: number, wordList: string[]) => {
  const emptyGrid: null[][] = new Array(gridSize * gridSize).fill(null);
  const grid: IGridMatrix = emptyGrid.map((_item, itemIndex) =>  {
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
