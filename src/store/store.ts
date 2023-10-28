import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/store/gameSlice.ts';
import userReducer from '@/store/userSlice.ts';
import notificationsReducer from '@/store/notificationsSlice.ts';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    notifications: notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
