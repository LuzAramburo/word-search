import { useAppSelector } from '@/store/hooks.ts';
import { Avatar } from '@/components/ui/Avatar.tsx';
import { useRef } from 'react';

export const TournamentLobby = () => {
  const { tournament, user } = useAppSelector(state => state.user);
  const idInput = useRef<null | HTMLInputElement>(null);

  const copyId = async () => {
    if (tournament?.id) {
      try {
        idInput?.current?.focus();
        idInput?.current?.select();
        await navigator.clipboard.writeText(tournament?.id);
      //   TODO toast success
      } catch (e) {
        console.error('No writing permission', e);
      }
    }
  };

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <h2 className="text-3xl">Tournament</h2>
      <p>Share this ID with others players</p>
      <div className="relative">
        <input
          ref={idInput}
          value={tournament?.id}
          type="test"
          className="input input-bordered py-2 text-sm text-base-content rounded-md pr-10"
          readOnly
          onFocus={copyId}
        />
        <span className="absolute inset-y-0 right-0 flex items-center btn btn-ghost btn-square rounded-l-none">
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline" onClick={copyId}>
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
            </svg>
          </button>
        </span>
      </div>
      <button className="btn btn-primary">Start Game</button>
      <h3 className="text-xl mt-6">Participants</h3>
      <div className="flex flex-wrap max-w-2xl gap-2">
        <Avatar user={user} large />
        <Avatar user={user} large />
      </div>
    </div>
  );
};
