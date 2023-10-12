import { IGridItem } from '@/types/IGrid.ts';
import {
  GameDifficultyType,
  wordListFactory,
  WordSearchContextType,
  wordSearchInitialValuesFactory
} from '@/utils/WordSearchInitialValuesFactory.ts';

type InitializeAction = { type: 'initialize' }
type CollectingAction = { type: 'setCollectedLetter', payload: IGridItem; }
type ResetCollectingAction = { type: 'resetCollecting' }
type CheckMatchesAction = { type: 'checkMatches' }
type RestartGameAction = { type: 'restartGame' }
type ChangeDifficultyAction = { type: 'changeDifficulty', payload: GameDifficultyType }
type setRefAction = { type: 'setRef', payload: { name: string, element: HTMLDialogElement | null } }

export type WordSearchActions =
  InitializeAction
  | CollectingAction
  | ResetCollectingAction
  | CheckMatchesAction
  | ChangeDifficultyAction
  | setRefAction
  | RestartGameAction;


const myWords = ['Eggs', 'Milk', 'Butter', 'Oats', 'Sugar', 'Rusk', 'Chocolate'];

export function wordSearchReducer (state: WordSearchContextType, action: WordSearchActions): WordSearchContextType {
  switch (action.type) {
  case 'initialize': {
    return wordSearchInitialValuesFactory(wordListFactory(myWords, 12));
  }

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
      const collectedLetters = state.collectedLetters.map(item => item.position);
      updatedGrid = updatedGrid.map(cell => {
        if (collectedLetters.includes(cell.position)) return { ...cell, collected: false, used: true };
        return cell;
      });
    } else {
      const collectedLetters = state.collectedLetters.map(item => item.position);
      updatedGrid = updatedGrid.map(cell => {
        if (collectedLetters.includes(cell.position)) return { ...cell, collected: false };
        return cell;
      });
    }
    const allWordsFound = updatedWordList.every(item => item.found);
    if (allWordsFound) state.refs.winnerDialog?.showModal();
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
    return {
      ...wordSearchInitialValuesFactory(safeWordList, action.payload, updatedSize),
      refs: { ...state.refs },
    };
  }

  case 'restartGame': {
    const safeWordList = wordListFactory(state.wordList.map(item => item.word), state.size);
    return {
      ...wordSearchInitialValuesFactory(safeWordList, state.difficulty, state.size),
      refs: { ...state.refs },
    };
  }

  default:
    return state;
  }
}
