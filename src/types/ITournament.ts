import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';
import { IUser } from '@/types/IUser.ts';

export interface IParticipant extends Omit<IUser, 'email'> {
  currentRound: number;
}

export interface ITournament {
  docId: string;
  difficulty: GameDifficultyType;
  id: string;
  participants: IParticipant[];
  rounds: number;
  started: boolean;
  subject: WordListSubjects;
  owner: string;
}
