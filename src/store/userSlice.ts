import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/IUser.ts';
import { IParticipant, ITournament } from '@/types/ITournament.ts';

interface userState {
  user: IUser | null;
  isLoading: boolean;
  tournament: ITournament | null;
}

const initialState: userState = {
  user: null,
  isLoading: true,
  tournament: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    //TODO get tournament on refresh page
    setTournament: (state, action: PayloadAction<ITournament>) => {
      state.tournament = action.payload;
    },
    updateParticipants: (state, action: PayloadAction<IParticipant[]>) => {
      if (state.tournament) state.tournament.participants = action.payload;
    },
    startTournament: (state) => {
      if (state.tournament) state.tournament.started = true;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setTournament,
  updateParticipants,
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
