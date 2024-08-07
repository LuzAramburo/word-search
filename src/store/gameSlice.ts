import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGridItem } from '@/types/IGrid.ts';
import { IParticipant, ITournament } from '@/types/ITournament.ts';
import { DIFFICULTY_SIZE } from '@/utils/constants';
import { primaryInput } from 'detect-it';
import { IGame } from '@/utils/game-builder.ts';

interface ShowDialogPayload {
  name: 'gameSettingsDialog' | 'winnerDialog';
  show: boolean;
}

export interface WordSearchContext extends IGame {
  gameSettingsDialog: boolean;
  winnerDialog: boolean;
  tournament: ITournament | null;
}

const initialState: WordSearchContext = {
  collectedLetters: [],
  difficulty: 'normal',
  gameState: 'idle',
  grid: [],
  size: DIFFICULTY_SIZE.NORMAL,
  subject: 'random',
  wordList: [],
  gameSettingsDialog: false,
  winnerDialog: false,
  tournament: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGrid(state, { payload }) {
      return {
        ...state,
        gameSettingsDialog: false,
        winnerDialog: false,
        ...payload as IGame,
      };
    },
    showDialog(state, { payload }: PayloadAction<ShowDialogPayload>) {
      state[payload.name] = payload.show;
    },
    setCollectedLetter(state, { payload }: PayloadAction<IGridItem>) {

      const prevCollectedLetter = state.collectedLetters[state.collectedLetters.length - 1];
      const secondToLastCollectedLetter = state.collectedLetters[state.collectedLetters.length - 2];

      const canLetterBeCollected = state.collectedLetters.length <= 1
        || (
          secondToLastCollectedLetter.position === (prevCollectedLetter.position - state.size
          ) && payload.position - state.size === prevCollectedLetter.position) // vertical
        || (
          secondToLastCollectedLetter.position === (prevCollectedLetter.position - 1
          ) && payload.position - 1 === prevCollectedLetter.position) // horizontal
        || (
          secondToLastCollectedLetter.position === (prevCollectedLetter.position - state.size - 1
          ) && payload.position - state.size - 1 === prevCollectedLetter.position); // diagonal

      if (canLetterBeCollected) {
        const updatedGrid = [...state.grid];
        updatedGrid[payload.position].collected = true;
        state.collectedLetters.push(payload);
        state.gameState = 'collecting';
        state.grid = updatedGrid;
      }

    },
    stopCollecting(state) {
      state.collectedLetters = [];
      state.gameState = 'idle';
    },
    clearSelection(state) {
      state.grid = state.grid.map((cell) => {
        if (cell.collected) return { ...cell, collected: false };
        return cell;
      });
    },
    checkMatch(state) {
      const wordToMatch = state.collectedLetters
        .map((item) => item.letter)
        .join('');
      const updatedWordList = [...state.wordList];
      let updatedGrid = [...state.grid];

      const foundWordIndex = state.wordList.findIndex(
        (item) => item.word === wordToMatch,
      );

      if (foundWordIndex >= 0) {
        updatedWordList[foundWordIndex] = {
          ...updatedWordList[foundWordIndex],
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
        state.collectedLetters = [];
      } else {
        if (primaryInput === 'mouse') {
          const collectedLetters = state.collectedLetters.map(
            (item) => item.position,
          );
          updatedGrid = updatedGrid.map((cell) => {
            if (collectedLetters.includes(cell.position))
              return { ...cell, collected: false };
            return cell;
          });
        }
      }
      const allWordsFound = updatedWordList.every((item) => item.found);

      if (primaryInput === 'mouse') state.collectedLetters = [];
      state.winnerDialog = allWordsFound;
      state.gameState = allWordsFound ? 'winner' : 'idle';
      state.grid = updatedGrid;
      state.wordList = updatedWordList;
    },
    //TODO get tournament on refresh page
    setTournament: (state, { payload }: PayloadAction<ITournament>) => {
      state.tournament = payload;
    },
    clearTournament: (state) => {
      state.tournament = null;
    },
    setTournamentWinner: (state, { payload }: PayloadAction<IParticipant>) => {
      if (state.tournament) state.tournament.winner = payload;
      state.winnerDialog = true;
    },
    setTournamentParticipants: (state, { payload }: PayloadAction<IParticipant[]>) => {
      if (state.tournament) state.tournament.participants = payload;
    },
    startTournament: (state) => {
      if (state.tournament) state.tournament.status = 'STARTED';
    },
  },
});

export const {
  setGrid,
  showDialog,
  setCollectedLetter,
  stopCollecting,
  clearSelection,
  checkMatch,
  setTournament,
  setTournamentParticipants,
  startTournament,
  setTournamentWinner,
  clearTournament,
} = gameSlice.actions;
const gameReducer =  gameSlice.reducer;
export default gameReducer;
