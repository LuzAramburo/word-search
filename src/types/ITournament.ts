import { IUser } from '@/types/IUser.ts';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';

export interface IParticipant extends Omit<IUser, 'email'> {
  roundsFinished: number;
}

export interface ITournament {
  docId: string;
  code: string;
  participants: IParticipant[];
  rounds: number;
  started: boolean;
  userOwner: string;
  winner: null | IParticipant;
  difficulty: GameDifficultyType;
  subject: WordListSubjects;
}
