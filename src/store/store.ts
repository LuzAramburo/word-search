import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/store/gameSlice.ts';
import userReducer from '@/store/userSlice.ts';
import notificationsReducer from '@/store/notificationsSlice.ts';
import { gridApi } from '@/store/gridApi.ts';

export const store = configureStore({
  reducer: {
    [gridApi.reducerPath]: gridApi.reducer,
    game: gameReducer,
    user: userReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gridApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
