import { useAppSelector } from '@/store/hooks.ts';

export const NavbarAvatar = () => {
  const { user, isLoading } = useAppSelector(state => state.user);

  return (
    <>
      {isLoading && <div className="avatar placeholder animate-pulse">
        <div className="bg-neutral-focus text-neutral-content rounded w-11" />
      </div>}
      {user && user?.avatar && <div className="avatar">
        <div className="w-11 rounded">
          <img src={user.avatar} referrerPolicy="no-referrer" alt={user.displayName ?? ''} />
        </div>
      </div>}
      {user && !user?.avatar && <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded w-11">
          <span className="text-xs">{user.displayName?.slice(0, 1).toUpperCase()}</span>
        </div>
      </div>}
    </>
  );
};
