import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';
import { IUser } from '@/types/IUser.ts';

export interface IParticipants extends IUser {
  currentRound: number;
}

export interface ITournament {
  difficulty: GameDifficultyType;
  id: string;
  participants: IParticipants[];
  rounds: number;
  started: boolean;
  subject: WordListSubjects;
}
