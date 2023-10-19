import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/store/gameSlice.ts';
import userReducer from '@/store/userSlice.ts';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
