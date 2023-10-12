import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';
import { WordSearchActions, wordSearchReducer } from '@/context/WordSearchReducer.tsx';
import {
  WordSearchContextType
} from '@/utils/WordSearchInitialValuesFactory.ts';

export type WordSearchProps = { children: ReactNode; };

export const WordSearchContext = createContext<WordSearchContextType | null>(null);
export const WordSearchDispatchContext = createContext<Dispatch<WordSearchActions> | null>(null);

export const WordSearchProvider = ({ children }: WordSearchProps) => {
  const [state, dispatch ] = useReducer(
    wordSearchReducer,
    {
      gameState: 'loading',
      collectedLetters: [],
      wordList: [],
      grid: [],
      size: 12,
      difficulty: 'normal',
      refs: {
        configDialog: null,
        winnerDialog: null,
      },
    },
  );


  useEffect(() => {
    dispatch({ type: 'initialize' });
  }, []);

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
