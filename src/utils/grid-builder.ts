import { IGridItem } from '@/types/IGrid.ts';

export class GridBuilder {
  grid = [] as IGridItem[];

  private gridSize!: number;
  private words!: string[];
  private gridMatrix!: IGridItem[];
  private positions = {
    ROW: 'row',
    COLUMN: 'column',
    DIAGONAL: 'diagonal',
  };

  constructor() {
  }

  setSize(size: number) {
    this.gridSize = size;
    return this;
  }

  setWords(words: string[]) {
    this.words = words;
    return this;
  }

  private generateMatrix(gridSize: number) {
    this.gridMatrix = new Array(gridSize * gridSize)
      .fill(null)
      .map((_item, itemIdx) => ({
        letter: '',
        position: itemIdx,
        col: itemIdx % this.gridSize,
        row: Math.floor(itemIdx / this.gridSize),
        collected: false,
        used: false,
      }));
  }

  private fillGrid(gridMatrix: IGridItem[], wordList: string[]) {
    const positions = [this.positions.ROW, this.positions.COLUMN, this.positions.DIAGONAL];
    const maxAttempts = 500;
    let successfulPlacement = false;

    // If max attempts reached, start all over again
    while (!successfulPlacement) {
      let updatedGrid = [...gridMatrix];
      let attempts = 0;
      successfulPlacement = true;

      wordList.forEach((word) => {
        let wordPlaced = false;

        while (!wordPlaced) {
          if (attempts >= maxAttempts) {
            successfulPlacement = false;
            break;
          }

          const orientation = positions[Math.floor(Math.random() * positions.length)];
          const randomStartingPosition = Math.floor(Math.random() * gridMatrix.length);
          const randomStartingCell = { ...updatedGrid[randomStartingPosition] };

          const gridWithWordPlaced = this.placeWordInGrid(
            updatedGrid,
            this.gridSize,
            word,
            randomStartingCell,
            orientation,
          );
          attempts++;

          if (gridWithWordPlaced) {
            // console.log(`=>(grid-builder.ts:75) attempts for word ${word}: `, attempts);
            attempts = 0;
            updatedGrid = gridWithWordPlaced;
            wordPlaced = true;
          }
        }
      });

      if (!successfulPlacement) {
        // console.warn('=>(grid-builder.ts:84) Could not place a word. Trying again.');
        this.fillGrid(gridMatrix, wordList);
        break;
      }
      this.grid = this.placeRandomLetters(updatedGrid);
    }
  }

  placeWordInGrid(
    grid: IGridItem[],
    gridSize: number,
    word: string,
    cell: IGridItem,
    direction: string,
  ) {
    const newGrid = [...grid];

    // If the cell already contains the same initial letter as the word or is an empty letter
    if (newGrid[cell.position].letter === word.slice(0, 1) || newGrid[cell.position].letter === '') {

      if (direction === this.positions.ROW && (cell.col + word.length) <= gridSize) {
        let startingCell = cell.position;
        for (const letter of word) {
          // if the cell of grid tested for placement is not an empty letter
          // and is different from the letter is trying to add
          if (newGrid[cell.position].letter !== '' && newGrid[startingCell].letter !== letter) return null;
          newGrid[startingCell] = { ...newGrid[startingCell], letter: letter };
          startingCell = startingCell + 1;
        }
        return newGrid;
      }
      if (direction === this.positions.COLUMN && (cell.row + word.length) <= gridSize) {
        let startingCell = cell.position;
        for (const letter of word) {
          if (newGrid[startingCell].letter !== '' && newGrid[startingCell].letter !== letter) return null;
          newGrid[startingCell] = { ...newGrid[startingCell], letter: letter };
          startingCell = startingCell + gridSize;
        }
        return newGrid;
      }

      if (
        direction === this.positions.DIAGONAL
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
  }

  placeRandomLetters(grid: IGridItem[]) {
    const updatedGrid = [...grid];
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    for (let position = 0; position < updatedGrid.length; position++) {
      if (updatedGrid[position].letter === '') {
        updatedGrid[position] = {
          ...updatedGrid[position],
          letter: import.meta.env.VITE_DEBUG_GRID
            ? 'x'
            : letters[Math.floor(Math.random() * letters.length)],
        };
      }
    }

    return updatedGrid;
  }

  build() {
    if (!this.gridSize) throw new Error('Size is required');

    this.generateMatrix(this.gridSize);
    this.fillGrid(this.gridMatrix, this.words);

    return this.grid;
  }
}
