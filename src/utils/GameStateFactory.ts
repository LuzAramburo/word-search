import { defaultDifficulty } from '@/utils/constants.ts';
import { GridParams } from '@/store/gridApi.ts';
import { GameBuilder, IGame } from '@/utils/game-builder.ts';

export type GameStateType = 'idle' | 'collecting' | 'winner';

export type GameDifficultyType = 'easy' | 'normal' | 'hard';

export interface GameStateFactoryResponse extends IGame {}

export const generateGrid = (arg: GridParams) => {
  const difficulty = arg.difficulty || defaultDifficulty();
  const gameFactory = new GameBuilder();

  return gameFactory
    .setDifficulty(difficulty)
    .setSubject(arg.subject)
    .build();
};

