import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { WordSearchActions, WordSearchContextType, wordSearchReducer } from '@/context/WordSearchReducer.tsx';
import { gridFactory } from '@/utils/gridFactory.ts';

export const WordSearchContext = createContext<WordSearchContextType | null>(null);
export const WordSearchDispatchContext = createContext<Dispatch<WordSearchActions> | null>(null);

export type WordSearchProps = { children: ReactNode; };

const myWords = ['Eggs', 'Milk', 'Butter', 'Oats', 'Sugar', 'Rusk', 'Chocolate'];
const gridSize = 12;

const initialValue: WordSearchContextType = {
  gameState: 'idle',
  wordList: myWords,
  collectedLetters: [],
  grid: gridFactory(gridSize, myWords),
};

export const WordSearchProvider = ({ children }: WordSearchProps) => {
  const [state, dispatch ] = useReducer(wordSearchReducer, initialValue);

  return (
    <WordSearchContext.Provider value={state}>
      <WordSearchDispatchContext.Provider value={dispatch}>
        {children}
      </WordSearchDispatchContext.Provider>
    </WordSearchContext.Provider>
  );
};

