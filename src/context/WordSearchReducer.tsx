import { GameStateType, WordSearchContextType } from '@/context/WordSearchContext.tsx';
import { IGridItem } from '@/types/IGrid.ts';

type GameStateAction = { type: 'setGameState'; payload: GameStateType; }
type CollectingAction = { type: 'setCollectedLetter'; payload: IGridItem; }
type ResetCollectingAction = { type: 'resetCollecting' }
type CheckMatchesAction = { type: 'checkMatches' }

export type WordSearchActions = CollectingAction | GameStateAction | ResetCollectingAction | CheckMatchesAction;

export function wordSearchReducer (state: WordSearchContextType, action: WordSearchActions): WordSearchContextType {
  switch (action.type) {
  case 'setCollectedLetter': {
    const updatedGrid = [...state.grid];
    updatedGrid[action.payload.position] = { ...action.payload, color: 'var(--color-primary)' };
    return {
      ...state,
      gameState: 'collecting',
      collectedLetters: [...state.collectedLetters, action.payload],
      grid: updatedGrid,
    };
  }

  case 'resetCollecting':
    return {
      ...state,
      gameState: 'idle',
      collectedLetters: [],
    };

  case 'checkMatches': {
    const wordToMatch = state.collectedLetters.map(item => item.letter).join('');
    const updatedWordList = [...state.wordList];
    let updatedGrid = [...state.grid];

    const findIndex = state.wordList.findIndex(item => item.word === wordToMatch);
    if (findIndex > 0) {
      updatedWordList[findIndex] = { ...updatedWordList[findIndex], found: true };
    } else {
      const collectedLetters = state.collectedLetters.map(item => item.position);
      updatedGrid = updatedGrid.map(cell => {
        if (collectedLetters.includes(cell.position)) return { ...cell, color: '' };
        return cell;
      });
    }
    return {
      ...state,
      gameState: 'idle',
      collectedLetters: [],
      wordList: updatedWordList,
      grid: updatedGrid,
    };
  }

  default:
    return state;
  }
}
