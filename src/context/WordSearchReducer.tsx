import { GameStateType, WordSearchContextType } from '@/context/WordSearchContext.tsx';
import { IGridItem } from '@/types/IGrid.tsx';

type GameStateAction = { type: 'setGameState'; payload: GameStateType; }
type CollectingAction = { type: 'setCollectedLetter'; payload: IGridItem; }
type ResetCollectingAction = { type: 'resetCollecting' }

export type WordSearchActions = CollectingAction | GameStateAction | ResetCollectingAction;


export function wordSearchReducer (state: WordSearchContextType, action: WordSearchActions): WordSearchContextType {
  switch (action.type) {
  case 'setCollectedLetter':
    return {
      ...state,
      gameState: 'collecting',
      collectedLetters: [...state.collectedLetters, action.payload],
    };

  case 'resetCollecting':
    return {
      ...state,
      gameState: 'idle',
      collectedLetters: [],
    };

  case 'setGameState':
    return {
      ...state,
      gameState: action.payload,
    };

  default:
    return state;
  }
}
