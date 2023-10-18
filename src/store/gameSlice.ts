import { GameDifficultyType, gameStateFactory, WordSearchContextType } from '@/utils/GameStateFactory.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wordListFactory, WordListSubjects } from '@/utils/WordListFactory.tsx';
import { IGridItem } from '@/types/IGrid.ts';

interface ShowDialogPayload {
  name: 'gameSettingsDialog' | 'winnerDialog';
  show: boolean;
}

interface ChangeSettingsPayload {
  difficulty: GameDifficultyType;
  subject: WordListSubjects;
}

const initialState: WordSearchContextType = {
  collectedLetters: [],
  difficulty: 'normal',
  gameState: 'loading',
  grid: [],
  size: 12,
  subject: 'random',
  wordList: [],
  gameSettingsDialog: false,
  winnerDialog: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    init() {
      return gameStateFactory(wordListFactory());
    },
    showDialog(state, action: PayloadAction<ShowDialogPayload>) {
      state[action.payload.name] = action.payload.show;
    },
    changeSettings(state, action: PayloadAction<ChangeSettingsPayload>) {
      if (
        action.payload.difficulty === state.difficulty
        && action.payload.subject === state.subject
      ) return state;
      let updatedSize = 12;
      if (action.payload.difficulty === 'easy') updatedSize = 7;
      if (action.payload.difficulty === 'normal') updatedSize = 12;
      if (action.payload.difficulty === 'hard') updatedSize = 17;
      const wordList = wordListFactory(
        action.payload.subject,
        updatedSize,
        action.payload.difficulty,
      );
      return {
        ...gameStateFactory(
          wordList,
          action.payload.subject,
          action.payload.difficulty,
          updatedSize,
        ),
      };
    },
    setCollectedLetter(state, action: PayloadAction<IGridItem>) {
      const updatedGrid = [...state.grid];
      updatedGrid[action.payload.position].collected = true;
      state.collectedLetters.push(action.payload);
      state.gameState = 'collecting';
      state.grid = updatedGrid;
    },
    stopCollecting(state) {
      state.collectedLetters = [];
      state.gameState = 'idle';
    },
    checkMatch(state) {
      const wordToMatch = state.collectedLetters
        .map((item) => item.letter)
        .join('');
      const updatedWordList = [...state.wordList];
      let updatedGrid = [...state.grid];

      const findIndex = state.wordList.findIndex(
        (item) => item.word === wordToMatch,
      );

      if (findIndex >= 0) {
        updatedWordList[findIndex] = {
          ...updatedWordList[findIndex],
          found: true,
        };
        const collectedLetters = state.collectedLetters.map(
          (item) => item.position,
        );
        updatedGrid = updatedGrid.map((cell) => {
          if (collectedLetters.includes(cell.position))
            return { ...cell, collected: false, used: true };
          return cell;
        });
      } else {
        const collectedLetters = state.collectedLetters.map(
          (item) => item.position,
        );
        updatedGrid = updatedGrid.map((cell) => {
          if (collectedLetters.includes(cell.position))
            return { ...cell, collected: false };
          return cell;
        });
      }
      const allWordsFound = updatedWordList.every((item) => item.found);

      state.collectedLetters = [];
      state.winnerDialog = allWordsFound;
      state.gameState = allWordsFound ? 'winner' : 'idle';
      state.grid = updatedGrid;
      state.wordList = updatedWordList;
    },
    restartGame(state) {
      const safeWordList = wordListFactory(
        state.subject,
        state.size,
        state.difficulty,
      );
      return {
        ...gameStateFactory(
          safeWordList,
          state.subject,
          state.difficulty,
          state.size,
        ),
      };
    },
  },
});

export const {
  init,
  showDialog,
  changeSettings,
  setCollectedLetter,
  stopCollecting,
  checkMatch,
  restartGame,
} = gameSlice.actions;
const gameReducer =  gameSlice.reducer;
export default gameReducer;
