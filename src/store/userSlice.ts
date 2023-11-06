import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/IUser.ts';

interface userState {
  user: IUser | null;
  isLoading: boolean;
  redirectedFrom: string | null;
}

const initialState: userState = {
  user: null,
  isLoading: false,
  redirectedFrom: null,
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
    setIsRedirected: (state, action: PayloadAction<string | null>) => {
      state.redirectedFrom = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setIsRedirected,
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
