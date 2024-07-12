import { WordListSubjects } from '@/utils/WordListFactory.ts';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';

export const TOURNAMENTS_DB = 'tournaments';

export const SUBJECT_OPTIONS: { id: WordListSubjects; label: string }[] = [
  { id: 'random', label: 'Random' },
  { id: 'adjectives', label: 'Adjectives' },
  { id: 'boardgames', label: 'Boardgames' },
  { id: 'computers', label: 'Computers' },
  { id: 'food', label: 'Food' },
  { id: 'space', label: 'Outer Space' },
];

export const DIFFICULTY_OPTIONS: GameDifficultyType[] = ['easy', 'normal', 'hard'];

export const DIFFICULTY_SIZE = {
  EASY: 7,
  NORMAL: 10,
  HARD: 13,
};

export const defaultDifficulty = (): GameDifficultyType => import.meta.env.VITE_DEBUG_GRID ? 'easy' : 'normal';

export const defaultSize = () => import.meta.env.VITE_DEBUG_GRID ? DIFFICULTY_SIZE.EASY : DIFFICULTY_SIZE.NORMAL;
