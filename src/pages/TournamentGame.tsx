import Game from '@/pages/Game.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { TournamentLobby } from '@/components/Tournament/TournamentLobby.tsx';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { ITournament } from '@/types/ITournament.ts';
import { startTournament } from '@/store/userSlice.ts';
import { changeSettings } from '@/store/gameSlice.ts';

export const TournamentGame = () => {
  const { tournament, user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tournament) return;
    dispatch(changeSettings({
      difficulty: tournament.difficulty,
      subject: tournament.subject,
    }));

    if (tournament.owner === user?.uid) return;
    return onSnapshot(doc(db, 'tournaments', tournament.docId), (doc) => {
      const tournament = doc.data() as ITournament;
      if (tournament.started) dispatch(startTournament());
    });
  }, []);

  if (!tournament?.started) return (
    <TournamentLobby />
  );
  return (
    <Game />
  );
};
