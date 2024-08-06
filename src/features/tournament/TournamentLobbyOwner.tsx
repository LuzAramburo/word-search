import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useRef } from 'react';
import { startTournament } from '@/store/gameSlice.ts';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { TOURNAMENTS_DB } from '@/utils/constants.ts';
import { TOURNAMENT_STATUS } from '@/types/ITournament.ts';

export const TournamentLobbyOwner = () => {
  const tournament = useAppSelector(state => state.game.tournament);
  const dispatch = useAppDispatch();

  const idInput = useRef<null | HTMLInputElement>(null);

  const startHandler = async () => {
    if (!tournament) return;
    const docRef = doc(db, TOURNAMENTS_DB, tournament.docId);
    try {
      await updateDoc(docRef, {
        status: TOURNAMENT_STATUS.STARTED,
      });
      dispatch(startTournament());
    }catch (e) {
      throw new Error('Error Starting tournament');
    }
  };

  const focusInput = async () => {
    idInput?.current?.focus();
    idInput?.current?.select();
  };
  return (
    <>
      <p>Share this Code with other players</p>
      <div className="relative">
        <CopyToClipboard text={tournament?.code ?? ''}>
          <input
            ref={idInput}
            value={tournament?.code}
            type="text"
            className="input input-bordered py-2 text-sm rounded-md pr-10"
            readOnly
            onFocus={focusInput}
          />
        </CopyToClipboard>
        <span className="absolute inset-y-0 right-0 flex items-center btn btn-ghost btn-square rounded-l-none">
          <CopyToClipboard text={tournament?.code ?? ''}>
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline" onClick={focusInput}>
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
              </svg>
            </button>
          </CopyToClipboard>
        </span>
      </div>
      <button className="btn btn-primary" onClick={startHandler}>Start Game</button>
    </>
  );
};
