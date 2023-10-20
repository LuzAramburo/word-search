import { WordListSubjects } from '@/utils/WordListFactory.tsx';

export const SUBJECT_OPTIONS: { id: WordListSubjects, label: string }[] = [
  { id: 'random', label: 'Random' },
  { id: 'adjectives', label: 'Adjectives' },
  { id: 'boardgames', label: 'Boardgames' },
  { id: 'computers', label: 'Computers' },
  { id: 'food', label: 'Food' },
  { id: 'space', label: 'Outer Space' },
];


export const DIFFICULTY_OPTIONS = ['easy', 'normal', 'hard'];
