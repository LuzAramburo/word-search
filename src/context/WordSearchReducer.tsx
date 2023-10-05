import { IGridItem } from '@/types/IGrid.tsx';

type GameState = 'idle' | 'collecting' | 'answering'

export type WordSearchContextType = {
  gameState: GameState;
  collectedLetters: string[];
  wordList: string[];
  grid: IGridItem[];
}

export type GameStateAction = { type: 'setGameState'; payload: GameState; }
export type CollectingAction = { type: 'setCollectedLetter'; payload: string; }

export type WordSearchActions = CollectingAction | GameStateAction;


export function wordSearchReducer (state: WordSearchContextType, action: WordSearchActions) {
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
