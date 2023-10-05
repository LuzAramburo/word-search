import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { WordSearchActions, WordSearchContextType } from '@/context/WordSearchContext.types.tsx';

export const WordSearchContext = createContext<WordSearchContextType | null>(null);
export const WordSearchDispatchContext = createContext<Dispatch<WordSearchActions> | null>(null);

export type WordSearchProps = { children: ReactNode; };

const initialValue: WordSearchContextType = {
  gameState: 'idle',
  collectedLetters: [],
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

function wordSearchReducer (state: WordSearchContextType, action: WordSearchActions) {
  const { type, payload } = action;

  switch (type) {
  case 'setCollectedLetter':
    return {
      ...state,
      collectedLetters: [...state.collectedLetters, payload],
    };

  case 'setGameState':
    return {
      ...state,
      gameState: payload,
    };


  default:
    return state;
  }
}
