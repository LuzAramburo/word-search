import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import wordListAdjectives from '@/data/adjectives.en.tsx';
import wordListBoardgames from '@/data/boardgames.en.tsx';
import wordListComputers from '@/data/computers.en.tsx';
import wordListFood from '@/data/food.en.tsx';
import wordListSpace from '@/data/space.en.tsx';
import { IWord } from '@/types/IWord.ts';

export type WordListSubjects =  'adjectives' | 'boardgames' | 'computers' | 'food' | 'space' | 'random'

export class WordListBuilder {
  private offsetWord = 2;
  private wordListRandom = [
    ...wordListAdjectives,
    ...wordListBoardgames,
    ...wordListComputers,
    ...wordListFood,
    ...wordListSpace,
  ];
  private wordListMap = new Map<WordListSubjects, IWord[]>([
    ['adjectives', wordListAdjectives],
    ['boardgames', wordListBoardgames],
    ['computers', wordListComputers],
    ['food', wordListFood],
    ['space', wordListSpace],
    ['random', this.wordListRandom],
  ]);

  gridSize!: number;
  wordListLength!: number;
  subject!: WordListSubjects;
  difficulty!: GameDifficultyType;
  wordListSelected!: IWord[] | undefined;

  constructor() {}

  setSubject(subject: WordListSubjects) {
    this.subject = subject;
    return this;
  }

  setDifficulty(difficulty: GameDifficultyType) {
    this.difficulty = difficulty;
    return this;
  }

  setSize(size: number) {
    this.gridSize = size;
    return this;
  }

  build() {
    if (!this.subject) throw new Error('Subject is required');
    if (!this.difficulty) throw new Error('Difficulty is required');
    if (!this.gridSize) throw new Error('Size is required');

    this.wordListLength = this.gridSize - this.offsetWord;
    this.wordListSelected = this.wordListMap.get(this.subject);

    if (!this.wordListSelected) throw new Error('Word List Subject Unknown');

    this.wordListSelected = this.wordListSelected
      .filter(item => item.word.length < this.gridSize)
      .sort(() => 0.5 - Math.random())
      .slice(0, this.wordListLength);

    return this.wordListSelected;
  }
}
