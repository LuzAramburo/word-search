import { GameDifficultyType, GameStateType } from '@/utils/GameStateFactory.ts';
import { WordListBuilder, WordListSubjects } from '@/utils/word-list-builder.ts';
import { DIFFICULTY_SIZE } from '@/utils/constants.ts';
import { IWord } from '@/types/IWord.ts';
import { IGridItem } from '@/types/IGrid.ts';
import { ITournament } from '@/types/ITournament.ts';

type WordSearchContextType = {
  wordList: IWord[]; // ✔️
  subject: WordListSubjects; // ✔️
  size: number; // ✔️ Do i need it on the state?
  difficulty: GameDifficultyType; // ✔️

  grid: IGridItem[];
  gameState: GameStateType; //🟰
  collectedLetters: IGridItem[]; //🟰

  gameSettingsDialog: boolean; // ✖️ false, but not part of the game
  winnerDialog: boolean; // ✖️ false, but not part of the game
  tournament: ITournament | null; // ✖️ not part of the game
}

interface IGame {
  difficulty: GameDifficultyType;
  subject: WordListSubjects;
  wordList: IWord[];
  size: number;
  gameState: GameStateType;
  collectedLetters: IGridItem[];
}

export class GameBuilder {
  game: Partial<IGame> = {};

  setDifficulty(difficulty: GameDifficultyType) {
    this.game.difficulty = difficulty;
    return this;
  }

  setSubject(subject: WordListSubjects) {
    this.game.subject = subject;
    return this;
  }

  // TODO: May not be needed on the state
  private setSize(difficulty: GameDifficultyType) {
    let size: number = DIFFICULTY_SIZE.NORMAL;
    if (difficulty === 'easy') size = DIFFICULTY_SIZE.EASY;
    if (difficulty === 'normal') size = DIFFICULTY_SIZE.NORMAL;
    if (difficulty === 'hard') size = DIFFICULTY_SIZE.HARD;

    this.game.size = size;
  }

  build(): IGame {
    if (!this.game.difficulty) throw new Error('Difficulty is required');
    if (!this.game.subject) throw new Error('Subject is required');

    this.setSize(this.game.difficulty);
    if (!this.game.size) throw new Error('Grid size not calculated');

    this.game.wordList = new WordListBuilder()
      .setDifficulty(this.game.difficulty)
      .setSubject(this.game.subject)
      .setSize(this.game.size)
      .build();

    this.game.gameState = 'idle';
    this.game.collectedLetters = [] as IGridItem[];

    // TODO Grid builder

    return this.game as IGame;
  }
}
