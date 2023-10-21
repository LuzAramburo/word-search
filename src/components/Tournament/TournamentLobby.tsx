import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { Avatar } from '@/components/ui/Avatar.tsx';
import { useEffect, useRef } from 'react';
import { updateParticipants } from '@/store/userSlice.ts';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { ITournament } from '@/types/ITournament.ts';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const TournamentLobby = () => {
  const { tournament } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const idInput = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (!tournament) return;
    return onSnapshot(doc(db, 'tournaments', tournament.docId), (doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data: ', doc.data());
      const tournament = doc.data() as ITournament;
      dispatch(updateParticipants(tournament.participants));
    });
  }, []);

  const focusInput = async () => {
    idInput?.current?.focus();
    idInput?.current?.select();
  };

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <h2 className="text-3xl">Tournament</h2>
      <p>Share this ID with other players</p>
      <div className="relative">
        <CopyToClipboard text={tournament?.id ?? ''}>
          <input
            ref={idInput}
            value={tournament?.id}
            type="text"
            className="input input-bordered py-2 text-sm text-base-content rounded-md pr-10"
            readOnly
            onFocus={focusInput}
          />
        </CopyToClipboard>
        <span className="absolute inset-y-0 right-0 flex items-center btn btn-ghost btn-square rounded-l-none">
          <CopyToClipboard text={tournament?.id ?? ''}>
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline" onClick={focusInput}>
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
              </svg>
            </button>
          </CopyToClipboard>
        </span>
      </div>
      <button className="btn btn-primary">Start Game</button>
      <h3 className="text-xl mt-6">Participants</h3>
      <div className="flex flex-wrap max-w-2xl gap-2">
        {
          tournament?.participants
          && tournament?.participants.length > 0
          && tournament?.participants.map(participant => (
            <Avatar user={participant} large key={participant.uid} />
          ))
        }
      </div>
    </div>
  );
};
