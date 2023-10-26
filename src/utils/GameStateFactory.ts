import { IGridItem } from '@/types/IGrid.ts';
import { IWord } from '@/types/IWord.ts';
import { gridFactory } from '@/utils/gridFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';
import { ITournament } from '@/types/ITournament.ts';

export type GameStateType = 'loading' | 'idle' | 'collecting' | 'winner';

export type GameDifficultyType = 'easy' | 'normal' | 'hard';

export type WordSearchContextType = {
  gameState: GameStateType;
  subject: WordListSubjects;
  collectedLetters: IGridItem[];
  wordList: IWord[];
  grid: IGridItem[];
  size: number;
  difficulty: GameDifficultyType;
  gameSettingsDialog: boolean;
  winnerDialog: boolean;
  tournament: ITournament | null;
}

export const gameStateFactory = (
  wordList: IWord[],
  subject: WordListSubjects = 'random',
  difficulty = 'normal',
  size = 12,
) => {
  return <WordSearchContextType>{
    collectedLetters: [] as IGridItem[],
    difficulty,
    gameSettingsDialog: false,
    gameState: 'idle',
    grid: gridFactory(size, wordList),
    size: size,
    subject,
    winnerDialog: false,
    wordList,
  };
};
