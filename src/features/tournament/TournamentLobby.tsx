import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { Avatar } from '@/components/Avatar.tsx';
import { useEffect } from 'react';
import { setTournamentParticipants } from '@/store/gameSlice.ts';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/libs/firebase.ts';
import { IParticipant, ITournament } from '@/types/ITournament.ts';
import { TournamentLobbyOwner } from '@/features/tournament/TournamentLobbyOwner.tsx';
import { TournamentLobbyParticipant } from '@/features/tournament/TournamentLobbyParticipant.tsx';
import { TOURNAMENTS_DB } from '@/utils/constants.ts';
import { addToast } from '@/store/notificationsSlice.ts';

export const TournamentLobby = () => {
  const tournament = useAppSelector(state => state.game.tournament);
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tournament) return;
    return onSnapshot(doc(db, TOURNAMENTS_DB, tournament.docId), (doc) => {
      const tournament = doc.data() as ITournament;
      dispatch(setTournamentParticipants(tournament.participants));
      const lastParticipant = tournament.participants.slice(-1)[0];
      if (lastParticipant.uid !== user?.uid) {
        dispatch(addToast({
          content: 'A new participant joined!',
        }));
      }
    });
  }, []);


  return (
    <>
      <div className="text-center min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl">Tournament</h2>
        {tournament?.userOwner === user?.uid && (
          <TournamentLobbyOwner />
        )}
        {tournament?.userOwner !== user?.uid && (
          <TournamentLobbyParticipant />
        )}
        <h3 className="text-xl mt-6">Participants</h3>
        <div className="flex flex-wrap max-w-2xl gap-2">
          {
            tournament?.participants
          && tournament?.participants.length > 0
          && tournament?.participants.map((participant: IParticipant) => (
            <Avatar user={participant} large key={participant.uid} />
          ))
          }
        </div>
      </div>
    </>
  );
};
