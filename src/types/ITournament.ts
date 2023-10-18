import { GameDifficultyType } from '@/utils/WordSearchContextFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';

export interface Participants {
  id: string;
  displayName: string;
  currentRound: number;
}

export interface ITournament {
  difficulty: GameDifficultyType;
  id: string;
  participants: Participants[];
  rounds: number;
  started: boolean;
  subject: WordListSubjects;
}
