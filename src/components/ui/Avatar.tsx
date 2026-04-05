import classNames from 'classnames';
import { IUser } from '@/types/IUser.ts';

const AVATAR_COLORS = [
  'bg-red-300', 'bg-orange-300', 'bg-amber-300', 'bg-yellow-300',
  'bg-lime-300', 'bg-green-300', 'bg-emerald-300', 'bg-teal-300',
  'bg-cyan-300', 'bg-sky-300', 'bg-blue-300', 'bg-indigo-300',
  'bg-violet-300', 'bg-purple-300', 'bg-fuchsia-300', 'bg-pink-300',
  'bg-rose-300',
];

const getAvatarColor = (name?: string | null) => {
  if (!name) return AVATAR_COLORS[0];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

type IAvatar = Omit<IUser, 'email'>;

type Props = {
  user: IAvatar | null;
  large?: boolean;
  isLoading?: boolean;
};

export const Avatar = ({ user, large = false, isLoading = false }: Props) => {
  const userInitialLetter = user?.displayName
    ?.split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  const avatarBgColor = getAvatarColor(user?.displayName);

  if (isLoading && !user) return (
    <div className="avatar placeholder animate-pulse">
      <div className="bg-neutral-focus text-neutral-content rounded w-7" />
    </div>
  );

  return (
    <div
      className={classNames(
        'avatar',
        { 'placeholder':  !user?.avatar },
      )}
      title={user?.displayName ?? ''}>
      {user?.avatar && (
        <div className={classNames(
          'rounded',
          { 'w-8': !large },
          { 'w-12': large },
        )}>
          <img src={user.avatar} referrerPolicy="no-referrer" alt={user?.displayName ?? ''} />
        </div>
      )}
      {!user?.avatar &&(
        <div className={classNames(avatarBgColor, 'text-neutral rounded w-7')}>
          <span className="text-xs">{userInitialLetter}</span>
        </div>
      )}
    </div>
  );
};

