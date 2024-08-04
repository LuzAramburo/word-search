import { IUser } from '@/types/IUser.ts';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { WordListSubjects } from '@/utils/word-list-builder.ts';

export interface IParticipant extends Omit<IUser, 'email'> {
  roundsFinished: number;
}

export const TOURNAMENT_STATUS = {
  CREATED: 'CREATED',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
};

type tournamentStatus = keyof typeof TOURNAMENT_STATUS;

export interface ITournament {
  docId: string;
  code: string;
  participants: IParticipant[];
  rounds: number;
  status: tournamentStatus;
  userOwner: string;
  winner: null | IParticipant;
  difficulty: GameDifficultyType;
  subject: WordListSubjects;
}
