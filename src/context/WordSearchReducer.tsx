import { IGridItem } from '@/types/IGrid.ts';
import {
  GameDifficultyType,
  WordSearchContextType,
  wordSearchContextFactory
} from '@/utils/WordSearchContextFactory.ts';
import { wordListFactory, WordListSubjects } from '@/utils/WordListFactory.tsx';

interface ChangeSettingsPayload {
  difficulty: GameDifficultyType;
  subject: WordListSubjects;
}

interface setRefPayload {
  name: string;
  element: HTMLDialogElement | null;
}

type InitializeAction = { type: 'initialize' }
type CollectingAction = { type: 'setCollectedLetter', payload: IGridItem; }
type ResetCollectingAction = { type: 'resetCollecting' }
type CheckMatchesAction = { type: 'checkMatches' }
type RestartGameAction = { type: 'restartGame' }
type ChangeSettingsAction = { type: 'changeSettings', payload: ChangeSettingsPayload }
type setRefAction = { type: 'setRef', payload: setRefPayload }

export type WordSearchActions =
  InitializeAction
  | CollectingAction
  | ResetCollectingAction
  | CheckMatchesAction
  | ChangeSettingsAction
  | setRefAction
  | RestartGameAction;

export function wordSearchReducer (state: WordSearchContextType, action: WordSearchActions): WordSearchContextType {
  switch (action.type) {
  case 'initialize': {
    return wordSearchContextFactory(wordListFactory());
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

  case 'changeSettings': {
    if (action.payload.difficulty === state.difficulty && action.payload.subject === state.subject) return state;
    let updatedSize = 12;
    if (action.payload.difficulty === 'easy') updatedSize = 7;
    if (action.payload.difficulty === 'normal') updatedSize = 12;
    if (action.payload.difficulty === 'hard') updatedSize = 17;
    const wordList = wordListFactory(action.payload.subject, updatedSize, action.payload.difficulty);
    return {
      ...wordSearchContextFactory(wordList, state.subject, action.payload.difficulty, updatedSize),
      refs: { ...state.refs },
    };
  }

  case 'restartGame': {
    const safeWordList = wordListFactory(state.subject, state.size, state.difficulty);
    return {
      ...wordSearchContextFactory(safeWordList, state.subject, state.difficulty, state.size),
      refs: { ...state.refs },
    };
  }

  default:
    return state;
  }
}
