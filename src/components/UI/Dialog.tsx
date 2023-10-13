import { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  open: boolean;
};
export const Dialog = ({ children, open }: Props) => {
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
