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
  const tournamentDocId = tournament?.docId;
  const tournamentOwner = tournament?.userOwner;
  const uid = user?.uid;

  useEffect(() => {
    if (tournamentDocId && tournamentOwner !== uid) {
      return onSnapshot(doc(db, TOURNAMENTS_DB, tournamentDocId), (snapshot) => {
        const data = snapshot.data() as ITournament;
        if (data.status === 'STARTED') dispatch(startTournament());
      });
    }
  }, [tournamentDocId, tournamentOwner, uid, dispatch]);

  if (tournament?.status === 'CREATED') return (
    <TournamentLobby />
  );

  return (
    <TournamentGame />
  );
};

export default TournamentID;
