import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { TournamentLobby } from '@/components/Tournament/TournamentLobby.tsx';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { ITournament } from '@/types/ITournament.ts';
import { startTournament } from '@/store/gameSlice.ts';
import TournamentGame from '@/components/Tournament/TournamentGame.tsx';
import { TOURNAMENTS_DB } from '@/utils/constants';

const TournamentID = () => {
  const { tournament } = useAppSelector(state => state.game);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tournament && tournament.userOwner !== user?.uid) {
      return onSnapshot(doc(db, TOURNAMENTS_DB, tournament.docId), (doc) => {
        const tournament = doc.data() as ITournament;
        if (tournament.started) dispatch(startTournament());
      });
    }
  }, []);

  if (!tournament?.started) return (
    <TournamentLobby />
  );

  return (
    <TournamentGame />
  );
};

export default TournamentID;
