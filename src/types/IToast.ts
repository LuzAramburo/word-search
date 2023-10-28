export type ToastTypes = 'success' | 'error' | 'info'

export interface IToast {
  id: string;
  type: ToastTypes;
  content: string;
  timer: number;
}
