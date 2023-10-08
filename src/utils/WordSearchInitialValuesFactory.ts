import { IGridItem } from '@/types/IGrid.ts';
import { IWord } from '@/types/IWord.ts';
import { gridFactory } from '@/utils/gridFactory.ts';

export type GameStateType = 'idle' | 'collecting';

export type GameDifficultyType = 'easy' | 'normal' | 'hard';

export type WordSearchContextType = {
  gameState: GameStateType;
  collectedLetters: IGridItem[];
  wordList: IWord[];
  grid: IGridItem[];
  size: number;
  difficulty: GameDifficultyType;
}

export const wordListFactory = (myWords: string[], gridSize: number) => {
  return myWords
    .filter(word => word.length < gridSize)
    .map(word => ({ word: word.toUpperCase(), found: false }));
};

export const wordSearchInitialValuesFactory = (
  wordList: IWord[],
  difficulty = 'normal',
  size = 12,
) => {
  return <WordSearchContextType>{
    gameState: 'idle',
    wordList,
    collectedLetters: [] as IGridItem[],
    grid: gridFactory(size, wordList),
    size: size,
    difficulty,
  };
};