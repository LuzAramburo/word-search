import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string | null;
  uid: string;
  displayName: string | null;
  avatar: string | null;
}

interface userState {
  user: User | null;
  isLoading: boolean;
}

const initialState: userState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
