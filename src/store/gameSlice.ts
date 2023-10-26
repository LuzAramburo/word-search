import { GameDifficultyType, gameStateFactory, WordSearchContextType } from '@/utils/GameStateFactory.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wordListFactory, WordListSubjects } from '@/utils/WordListFactory.tsx';
import { IGridItem } from '@/types/IGrid.ts';
import { IParticipant, ITournament } from '@/types/ITournament.ts';

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
  tournament: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    init() {
      return gameStateFactory(wordListFactory());
    },
    showDialog(state, { payload }: PayloadAction<ShowDialogPayload>) {
      state[payload.name] = payload.show;
    },
    changeSettings(state, { payload }: PayloadAction<ChangeSettingsPayload>) {
      if (
        payload.difficulty === state.difficulty
        && payload.subject === state.subject
      ) return state;
      let updatedSize = 12;
      if (payload.difficulty === 'easy') updatedSize = 7;
      if (payload.difficulty === 'normal') updatedSize = 12;
      if (payload.difficulty === 'hard') updatedSize = 17;
      const wordList = wordListFactory(
        payload.subject,
        updatedSize,
        payload.difficulty,
      );
      return {
        ...state,
        ...gameStateFactory(
          wordList,
          payload.subject,
          payload.difficulty,
          updatedSize,
        ),
      };
    },
    setCollectedLetter(state, { payload }: PayloadAction<IGridItem>) {
      const updatedGrid = [...state.grid];
      updatedGrid[payload.position].collected = true;
      state.collectedLetters.push(payload);
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
        ...state,
        ...gameStateFactory(
          safeWordList,
          state.subject,
          state.difficulty,
          state.size,
        ),
      };
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
      if (state.tournament) state.tournament.started = true;
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
  setTournament,
  setTournamentParticipants,
  startTournament,
  setTournamentWinner,
  clearTournament,
} = gameSlice.actions;
const gameReducer =  gameSlice.reducer;
export default gameReducer;
