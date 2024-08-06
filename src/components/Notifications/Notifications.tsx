import { useAppSelector } from '@/store/hooks.ts';
import { Toast } from '@/components/Notifications/Toast.tsx';

export const Notifications = () => {
  const { toasts } = useAppSelector(state => state.notifications);
  return (
    <div className="toast toast-start toast-bottom pointer-events-none">
      {toasts.map((toast) => <Toast toast={toast} key={toast.id} />)}
    </div>
  );
};
