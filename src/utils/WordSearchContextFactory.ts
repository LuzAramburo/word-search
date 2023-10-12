import { IGridItem } from '@/types/IGrid.ts';
import { IWord } from '@/types/IWord.ts';
import { gridFactory } from '@/utils/gridFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';

export type GameStateType = 'loading' | 'idle' | 'collecting' | 'winner';

export type GameDifficultyType = 'easy' | 'normal' | 'hard';

export interface UIRefs {
  configDialog: HTMLDialogElement | null
  winnerDialog: HTMLDialogElement | null
}

export type WordSearchContextType = {
  gameState: GameStateType;
  subject: WordListSubjects;
  collectedLetters: IGridItem[];
  wordList: IWord[];
  grid: IGridItem[];
  size: number;
  difficulty: GameDifficultyType;
  refs: UIRefs;
}

export const wordSearchContextFactory = (
  wordList: IWord[],
  subject: WordListSubjects = 'random',
  difficulty = 'normal',
  size = 12,
) => {
  return <WordSearchContextType>{
    gameState: 'idle',
    subject,
    wordList,
    collectedLetters: [] as IGridItem[],
    grid: gridFactory(size, wordList),
    size: size,
    difficulty,
    refs: {
      configDialog: null,
      winnerDialog: null,
    },
  };
};
