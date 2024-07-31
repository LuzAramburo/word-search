import { GameDifficultyType, GameStateType } from '@/utils/GameStateFactory.ts';
import { WordListBuilder, WordListSubjects } from '@/utils/word-list-builder.ts';
import { DIFFICULTY_SIZE } from '@/utils/constants.ts';
import { IWord } from '@/types/IWord.ts';
import { IGridItem } from '@/types/IGrid.ts';
import { GridBuilder } from '@/utils/grid-builder.ts';

export interface IGame {
  difficulty: GameDifficultyType;
  subject: WordListSubjects;
  wordList: IWord[];
  grid: IGridItem[];
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

  private setSize(difficulty: GameDifficultyType) {
    let size: number = DIFFICULTY_SIZE.NORMAL;
    if (difficulty === 'easy') size = DIFFICULTY_SIZE.EASY;
    if (difficulty === 'normal') size = DIFFICULTY_SIZE.NORMAL;
    if (difficulty === 'hard') size = DIFFICULTY_SIZE.HARD;

    this.game.size = size;
  }

  build(): Promise<IGame> {
    return new Promise((resolve, reject) => {
      if (!this.game.difficulty) {
        reject(new Error('Difficulty is required'));
        return;
      }
      if (!this.game.subject) {
        reject(new Error('Subject is required'));
        return;
      }

      this.setSize(this.game.difficulty);
      if (!this.game.size) {
        reject(new Error('Grid size not calculated.'));
        return;
      }

      this.game.wordList = new WordListBuilder()
        .setDifficulty(this.game.difficulty)
        .setSubject(this.game.subject)
        .setSize(this.game.size)
        .build();

      this.game.gameState = 'idle';
      this.game.collectedLetters = [] as IGridItem[];

      const wordListStrings = this.game.wordList.map(item => item.word);
      this.game.grid = new GridBuilder()
        .setSize(this.game.size)
        .setWords(wordListStrings)
        .build();

      resolve(this.game as IGame);
    });
  }
}
