import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { WordSearchActions, wordSearchReducer } from '@/context/WordSearchReducer.tsx';
import {
  wordListFactory,
  WordSearchContextType,
  wordSearchInitialValuesFactory
} from '@/utils/WordSearchInitialValuesFactory.ts';

export type WordSearchProps = { children: ReactNode; };

export const WordSearchContext = createContext<WordSearchContextType | null>(null);
export const WordSearchDispatchContext = createContext<Dispatch<WordSearchActions> | null>(null);

const myWords = ['Eggs', 'Milk', 'Butter', 'Oats', 'Sugar', 'Rusk', 'Chocolate'];
export const WordSearchProvider = ({ children }: WordSearchProps) => {
  const [state, dispatch ] = useReducer(
    wordSearchReducer,
    wordSearchInitialValuesFactory(wordListFactory(myWords, 12)),
  );

  return (
    <WordSearchContext.Provider value={state}>
      <WordSearchDispatchContext.Provider value={dispatch}>
        {children}
      </WordSearchDispatchContext.Provider>
    </WordSearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useWordSearchContext () {
  return useContext(WordSearchContext) as WordSearchContextType;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWordSearchDispatch() {
  return useContext(WordSearchDispatchContext) as Dispatch<WordSearchActions>;
}
