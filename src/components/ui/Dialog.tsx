import { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  open: boolean;
  escKeyHandler?: () => void;
};

export const Dialog = ({ children, open, escKeyHandler }: Props) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if(escKeyHandler) escKeyHandler();
      }
    };
    if (escKeyHandler) document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [escKeyHandler]);

  return (
    <>
      <div className={classNames(
        'fixed w-screen h-screen bg-black/30 top-0 left-0',
        { 'hidden' : !open },
      )} />
      <dialog className={classNames(
        'modal',
        { 'modal-open': open },
      )}
      open={open}>
        <div className="modal-box">
          {children}
        </div>
      </dialog>
    </>
  );
};
