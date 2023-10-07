import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { WordSearchActions, wordSearchReducer } from '@/context/WordSearchReducer.tsx';
import { gridFactory } from '@/utils/gridFactory.ts';
import { IGridItem } from '@/types/IGrid.ts';
import { IWord } from '@/types/IWord.ts';

export const WordSearchContext = createContext<WordSearchContextType | null>(null);
export const WordSearchDispatchContext = createContext<Dispatch<WordSearchActions> | null>(null);

export type WordSearchProps = { children: ReactNode; };

export type GameStateType = 'idle' | 'collecting';

export type WordSearchContextType = {
  gameState: GameStateType;
  collectedLetters: IGridItem[];
  wordList: IWord[];
  grid: IGridItem[];
}

const myWords = ['Eggs', 'Milk', 'Butter', 'Oats', 'Sugar', 'Rusk', 'Chocolate'];
const gridSize = 12;

const initialValue: WordSearchContextType = {
  gameState: 'idle',
  wordList: myWords.map(word => ({ word: word.toUpperCase(), found: false })),
  collectedLetters: [] as IGridItem[],
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

// eslint-disable-next-line react-refresh/only-export-components
export function useWordSearchContext () {
  return useContext(WordSearchContext) as WordSearchContextType;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWordSearchDispatch() {
  return useContext(WordSearchDispatchContext) as Dispatch<WordSearchActions>;
}
