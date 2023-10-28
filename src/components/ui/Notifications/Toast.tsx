import { IToast } from '@/types/IToast.ts';
import classNames from 'classnames';
import { useAppDispatch } from '@/store/hooks.ts';
import { removeToast } from '@/store/notificationsSlice.ts';
import { useEffect } from 'react';

type ToastProps = {
  toast: IToast;
}

export const Toast = ({ toast }: ToastProps) => {
  const dispatch = useAppDispatch();

  const closeToast = () => {
    dispatch(removeToast(toast.id));
  };

  useEffect(() => {
    const autoRemoveToast = setTimeout(() => dispatch(removeToast(toast.id)), toast.timer);
    return () => clearTimeout(autoRemoveToast);
  }, []);

  return (
    <div className={classNames(
      'alert max-w-xs pointer-events-auto',
      { 'alert-error': toast.type === 'error' },
      { 'alert-success': toast.type === 'success' },
      { 'alert-info': toast.type === 'info' },
    )}>
      <span className="whitespace-normal">{toast.content}</span>
      <button onClick={closeToast}>
        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />
        </svg>
      </button>
    </div>
  );
};
