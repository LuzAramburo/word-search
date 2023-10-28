import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToast, ToastTypes } from '@/types/IToast.ts';
import generateUniqueId from 'generate-unique-id';

interface notificationsState {
  toasts: IToast[];
}

const initialState: notificationsState = {
  toasts: [],
};

interface setTostPayload {
  type?: ToastTypes;
  content: string;
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addToast: ({ toasts }, { payload }: PayloadAction<setTostPayload>) => {
      const toastFormatted: IToast = {
        type: 'info',
        ...payload,
        id: generateUniqueId(),
        timer: 5000,
      };
      toasts.push(toastFormatted);
    },
    removeToast: (state, { payload }: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== payload);
    },
  },
});

export const {
  addToast,
  removeToast,
} = notificationsSlice.actions;
const notificationsReducer = notificationsSlice.reducer;
export default notificationsReducer;
