import wordListFood from '@/data/food.en.tsx';
import wordListAdjectives from '@/data/adjectives.en.tsx';
import wordListBoardgames from '@/data/boardgames.en.tsx';
import wordListComputers from '@/data/computers.en.tsx';
import wordListSpace from '@/data/space.en.tsx';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { IWord } from '@/types/IWord.ts';
import { DIFFICULTY_SIZE } from '@/utils/constants.ts';

export type WordListSubjects =  'adjectives' | 'boardgames' | 'computers' | 'food' | 'space' | 'random'

export const wordListFactory = (
  subject: WordListSubjects = 'random',
  gridSize = DIFFICULTY_SIZE.NORMAL,
  difficulty: GameDifficultyType = 'normal',
) => {
  const offsetWord = 2;
  let wordListLength = gridSize - offsetWord;
  if (difficulty === 'easy') wordListLength = DIFFICULTY_SIZE.EASY - offsetWord;
  if (difficulty === 'hard') wordListLength = DIFFICULTY_SIZE.HARD - offsetWord;

  const wordListRandom = [
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
