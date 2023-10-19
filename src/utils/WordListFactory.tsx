import wordListFood from '@/data/food.en.tsx';
import wordListAdjectives from '@/data/adjectives.en.tsx';
import wordListBoardgames from '@/data/boardgames.en.tsx';
import wordListComputers from '@/data/computers.en.tsx';
import wordListSpace from '@/data/space.en.tsx';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { IWord } from '@/types/IWord.ts';

export type WordListSubjects =  'adjectives' | 'boardgames' | 'computers' | 'food' | 'space' | 'random'

export const wordListFactory = (
  subject: WordListSubjects = 'random',
  gridSize: number = 12,
  difficulty: GameDifficultyType = 'normal',
) => {
  let wordListLength  = 7;
  if (difficulty === 'easy') wordListLength = 5;
  if (difficulty === 'hard') wordListLength = 12;

  const wordListRandom =  [
    ...wordListAdjectives,
    ...wordListBoardgames,
    ...wordListComputers,
    ...wordListFood,
    ...wordListSpace,
  ];

  const wordListMap = new Map<WordListSubjects, IWord[]>([
    ['adjectives', wordListAdjectives],
    ['boardgames', wordListBoardgames],
    ['computers', wordListComputers],
    ['food', wordListFood],
    ['space', wordListSpace],
    ['random', wordListRandom],
  ]);

  const wordListSelected = wordListMap.get(subject);

  if (!wordListSelected) throw Error('Word List Subject Unknown');

  return wordListSelected
    .filter(item => item.word.length < gridSize)
    .sort(()=> .5 - Math.random())
    .slice(0, wordListLength);
};
