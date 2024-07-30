import { IGridItem } from '@/types/IGrid.ts';
import { IWord } from '@/types/IWord.ts';
import { gridFactory } from '@/utils/gridFactory.ts';
import { wordListFactory, WordListSubjects } from '@/utils/WordListFactory.ts';
import { ITournament } from '@/types/ITournament.ts';
import { defaultDifficulty, defaultSize, DIFFICULTY_SIZE } from '@/utils/constants.ts';
import { GridParams } from '@/store/gridApi.ts';

export type GameStateType = 'idle' | 'collecting' | 'winner';

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

export interface GameStateFactoryResponse extends Omit<WordSearchContextType, 'tournament'> {}

export const gameStateFactory = (
  wordList: IWord[],
  subject: WordListSubjects = 'random',
  difficulty: GameDifficultyType = defaultDifficulty(),
  size = defaultSize(),
) => {
  return <GameStateFactoryResponse>{
    collectedLetters: [] as IGridItem[],
    difficulty,
    gameState: 'idle',
    grid: gridFactory(size, wordList),
    size: size,
    subject,
    gameSettingsDialog: false,
    winnerDialog: false,
    wordList,
  };
};

export const generateGrid = async (arg: GridParams): Promise<GameStateFactoryResponse> => {
  const wordList = wordListFactory(arg.subject);
  const difficulty = arg.difficulty || defaultDifficulty();

  let size: number = DIFFICULTY_SIZE.NORMAL;
  if (difficulty === 'easy') size = DIFFICULTY_SIZE.EASY;
  if (difficulty === 'normal') size = DIFFICULTY_SIZE.NORMAL;
  if (difficulty === 'hard') size = DIFFICULTY_SIZE.HARD;

  return new Promise((resolve) => {
    resolve(gameStateFactory(wordList, arg.subject, difficulty, size));
  });
};

