import { IGridItem } from '@/types/IGrid.ts';
import {
  GameDifficultyType,
  GameStateType, wordListFactory,
  WordSearchContextType,
  wordSearchInitialValuesFactory
} from '@/utils/WordSearchInitialValuesFactory.ts';

type GameStateAction = { type: 'setGameState'; payload: GameStateType; }
type CollectingAction = { type: 'setCollectedLetter'; payload: IGridItem; }
type ResetCollectingAction = { type: 'resetCollecting' }
type CheckMatchesAction = { type: 'checkMatches' }
type ChangeDifficultyAction = { type: 'changeDifficulty', payload: GameDifficultyType }
type setRefAction = { type: 'setRef', payload: { name: string, element: HTMLDialogElement | null } }

export type WordSearchActions =
  CollectingAction
  | GameStateAction
  | ResetCollectingAction
  | CheckMatchesAction
  | ChangeDifficultyAction
  | setRefAction;

export function wordSearchReducer (state: WordSearchContextType, action: WordSearchActions): WordSearchContextType {
  switch (action.type) {
  case 'setCollectedLetter': {
    const updatedGrid = [...state.grid];
    updatedGrid[action.payload.position] = { ...action.payload, collected: true };
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

    if (findIndex >= 0) {
      updatedWordList[findIndex] = { ...updatedWordList[findIndex], found: true };
    } else {
      const collectedLetters = state.collectedLetters.map(item => item.position);
      updatedGrid = updatedGrid.map(cell => {
        if (collectedLetters.includes(cell.position)) return { ...cell, collected: false };
        return cell;
      });
    }
    const allWordsFound = updatedWordList.every(item => item.found);
    return {
      ...state,
      gameState: allWordsFound ? 'winner' : 'idle',
      collectedLetters: [],
      wordList: updatedWordList,
      grid: updatedGrid,
    };
  }

  case 'setRef': {
    return {
      ...state,
      refs: {
        ...state.refs,
        [action.payload.name]: action.payload.element,
      },
    };
  }

  case 'changeDifficulty': {
    if (action.payload === state.difficulty) return state;

    let updatedSize = 12;
    if (action.payload === 'easy') updatedSize = 7;
    if (action.payload === 'normal') updatedSize = 12;
    if (action.payload === 'hard') updatedSize = 17;

    const safeWordList = wordListFactory(state.wordList.map(item => item.word), updatedSize);
    return wordSearchInitialValuesFactory(safeWordList, action.payload, updatedSize);
  }

  default:
    return state;
  }
}
