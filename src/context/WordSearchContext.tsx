import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';
import { WordSearchActions, wordSearchReducer } from '@/context/WordSearchReducer.tsx';
import {
  WordSearchContextType
} from '@/utils/WordSearchContextFactory.ts';

export type WordSearchProps = { children: ReactNode; };

export const WordSearchContext = createContext<WordSearchContextType | null>(null);
export const WordSearchDispatchContext = createContext<Dispatch<WordSearchActions> | null>(null);

export const WordSearchProvider = ({ children }: WordSearchProps) => {
  const [state, dispatch ] = useReducer(
    wordSearchReducer,
    {
      collectedLetters: [],
      difficulty: 'normal',
      gameState: 'loading',
      grid: [],
      size: 12,
      subject: 'random',
      wordList: [],
      gameSettingsDialog: false,
      winnerDialog: false,
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
