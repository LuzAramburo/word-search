import classNames from 'classnames';
import { IUser } from '@/types/IUser.ts';

type Props = {
  user: IUser | null;
  large?: boolean;
  isLoading?: boolean;
};

export const Avatar = ({ user, large = false, isLoading = false }: Props) => {
  const userInitialLetter = user?.displayName?.slice(0, 1).toUpperCase();

  if (isLoading && !user) return (
    <div className="avatar placeholder animate-pulse">
      <div className="bg-neutral-focus text-neutral-content rounded w-7" />
    </div>
  );

  return (
    <div className={classNames(
      'avatar',
      { 'placeholder':  !user?.avatar },
    )}>
      {user?.avatar && (
        <div className={classNames(
          'rounded',
          { 'w-7': !large },
          { 'w-12': large },
        )}>
          <img src={user.avatar} referrerPolicy="no-referrer" alt={user?.displayName ?? ''} />
        </div>
      )}
      {!user?.avatar &&(
        <div className="bg-neutral-focus text-neutral-content rounded w-7">
          <span className="text-xs">{userInitialLetter}</span>
        </div>
      )}
    </div>
  );
};

