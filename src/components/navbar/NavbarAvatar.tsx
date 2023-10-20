import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import classNames from 'classnames';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase.ts';
import { clearUser } from '@/store/userSlice.ts';

// TODO esc key to close dropdown
export const NavbarAvatar = () => {
  const {
    user,
    isLoading,
  } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const userInitialLetter = user?.displayName?.slice(0, 1).toUpperCase();

  const logOutHandler = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  if (user) return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-square btn-hug">
        <div className={classNames('avatar', { 'placeholder':  !user.avatar })}>
          {user.avatar && (
            <div className="w-7 rounded">
              <img src={user.avatar} referrerPolicy="no-referrer" alt={user.displayName ?? ''} />
            </div>
          )}
          {!user.avatar &&(
            <div className="bg-neutral-focus text-neutral-content rounded w-7">
              <span className="text-xs">{userInitialLetter}</span>
            </div>
          )}
        </div>
      </button>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><button onClick={logOutHandler}>Log out</button></li>
      </ul>
    </div>
  );

  // TODO redirect on click to login when there's no user and is not loading
  return (
    <div className={classNames(
      'avatar placeholder',
      { 'animate-pulse': isLoading },
    )}>
      <div className="bg-neutral-focus text-neutral-content rounded w-7" />
    </div>
  );
};
