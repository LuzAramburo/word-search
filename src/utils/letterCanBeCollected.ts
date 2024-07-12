import { IGridItem } from '@/types/IGrid.ts';

export default function letterCanBeCollected(
  grid: IGridItem[],
  gridSize: number,
  collectedLetters: IGridItem[],
): boolean {
  console.log(collectedLetters.length);
  // stopcollecting cuando sueltas el click
  const isCollectedLetterEmpty = collectedLetters.length === 0;
  const letterToCollect = collectedLetters[collectedLetters.length - 1];

  if (!isCollectedLetterEmpty) {
    const aboveLeft = grid[letterToCollect.position - gridSize - 1]?.collected;
    const above = grid[letterToCollect.position - gridSize]?.collected;
    const aboveRight = grid[letterToCollect.position - gridSize + 1]?.collected;
    const left = grid[letterToCollect.position - 1]?.collected;
    const right = grid[letterToCollect.position + 1]?.collected;
    const south = grid[letterToCollect.position + gridSize]?.collected;
    const southWest = grid[letterToCollect.position + gridSize - 1]?.collected;
    const southEast = grid[letterToCollect.position + gridSize + 1]?.collected;

    const isNextToCollectedLetter = aboveLeft || aboveRight || above || left || right || southWest || south || southEast;
    console.log('isNextToCollectedLetter', isNextToCollectedLetter);
    console.log('collect?', isNextToCollectedLetter);
    return isNextToCollectedLetter;
  } else {
    console.log('isCollectedLetterEmpty', isCollectedLetterEmpty);
    return isCollectedLetterEmpty;
  }
}
