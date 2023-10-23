import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase.ts';
import { clearUser } from '@/store/userSlice.ts';
import { Avatar } from '@/components/ui/Avatar.tsx';

// TODO esc key to close dropdown
export const NavbarAvatar = () => {
  const {
    user,
    isLoading,
  } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const logOutHandler = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  if (isLoading) return (
    <Avatar user={user} isLoading={isLoading} />
  );

  if (user) return (
    <div className="dropdown dropdown-end flex items-center justify-center">
      <button className="btn btn-square btn-hug opacity-80 hover:opacity-100">
        <Avatar user={user} isLoading={isLoading} />
      </button>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><button onClick={logOutHandler}>Log out</button></li>
      </ul>
    </div>
  );

  // TODO redirect on click to login when there's no user and is not loading
  return (
    <button
      className="btn btn-square btn-ghost btn-sm"
    >
      <svg className="inline-block w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z" />
      </svg>
    </button>
  );
};
