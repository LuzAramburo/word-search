import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { Avatar } from '@/components/ui/Avatar.tsx';
import { useEffect } from 'react';
import { updateParticipants } from '@/store/userSlice.ts';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { ITournament } from '@/types/ITournament.ts';
import { TournamentLobbyOwner } from '@/components/Tournament/TournamentLobbyOwner.tsx';
import { TournamentLobbyParticipant } from '@/components/Tournament/TournamentLobbyParticipant.tsx';

export const TournamentLobby = () => {
  const { tournament, user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tournament) return;
    return onSnapshot(doc(db, 'tournaments', tournament.docId), (doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data: ', doc.data());
      const tournament = doc.data() as ITournament;
      dispatch(updateParticipants(tournament.participants));
    });
  }, []);


  return (
    <>
      <div className="text-center min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl">Tournament</h2>
        {tournament?.owner === user?.uid && (
          <TournamentLobbyOwner />
        )}
        {tournament?.owner !== user?.uid && (
          <TournamentLobbyParticipant />
        )}
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
    </>
  );
};
