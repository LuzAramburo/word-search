import { IGridMatrix } from '@/types/IGridMatrix.tsx';

const placeLetters = (gridMatrix: IGridMatrix) => {
  const positions = ['row', 'column', 'diagonal'];
  const orientation = positions[Math.floor(Math.random() * positions.length)];
  const startingPosition = Math.floor(Math.random() * gridMatrix.length);

  const newGrid = [...gridMatrix];
  newGrid[startingPosition] = { ...newGrid[startingPosition], letter: 'A' };
  return newGrid;
};

export const gridFactory = (gridSize: number) => {
  const emptyGrid: null[][] = new Array(gridSize * gridSize).fill(null);
  const grid = emptyGrid.map((item, itemIndex) =>  {
    return { letter: 'x', position: itemIndex, row: Math.floor(itemIndex / gridSize), col: itemIndex % gridSize };
  });

  const filledGrid = placeLetters(grid);
  return filledGrid;
};
