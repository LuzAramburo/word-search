import { Grid } from '@/components/grid/Grid';
import { WordList } from '@/components/wordList/WordList';
import { WinnerDialog } from '@/components/ui/WinnerDialog.tsx';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { confettiOptions } from '@/utils/confettiOptions.ts';
import { useCallback, useEffect, useState } from 'react';
import type { Engine } from 'tsparticles-engine';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { clearTournament, setTournamentParticipants, setTournamentWinner } from '@/store/gameSlice.ts';
import { ITournament, TOURNAMENT_STATUS } from '@/types/ITournament.ts';
import { TOURNAMENTS_DB } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { gridApi } from '@/store/gridApi.ts';
import { store } from '@/store/store.ts';

function Game() {
  const {
    gameState,
    tournament,
    difficulty,
    subject,
  } = useAppSelector(state => state.game);
  const [triggerGrid] = gridApi.endpoints.generateGrid.useLazyQuery();
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const [winnerDialogText, setWinnerDialogText] = useState({
    title: '',
    subtitle: '',
  });
  const navigate = useNavigate();

  const tournamentDocId = tournament?.docId;
  const uid = user?.uid;
  const userParticipant = tournament?.participants?.find(p => p.uid === uid);
  const roundsFinished = (userParticipant?.roundsFinished ?? 0) + 1;

  const goToCreateTournament = () => {
    dispatch(clearTournament());
    navigate('/tournament/create');
  };

  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  useEffect(() => {
    if (!tournamentDocId) return;

    return onSnapshot(doc(db, TOURNAMENTS_DB, tournamentDocId), (doc) => {
      const tournamentInDB = doc.data() as ITournament;
      if (tournamentInDB.winner && tournamentInDB.winner.uid !== uid) {
        setWinnerDialogText({ title: `${tournamentInDB.winner.displayName} Won!`, subtitle: 'Another round?' });
        dispatch(setTournamentWinner(tournamentInDB.winner));
      }
    });
  }, [dispatch, tournamentDocId, uid]);

  const handleRoundEnd = useCallback(async () => {
    const { tournament: freshTournament } = store.getState().game;
    if (!freshTournament || !tournamentDocId) return;

    const participants = freshTournament.participants;
    const userIdx = participants.findIndex(p => p.uid === uid);

    const updatedParticipants = [...participants];
    updatedParticipants[userIdx] = {
      ...updatedParticipants[userIdx],
      roundsFinished: updatedParticipants[userIdx].roundsFinished + 1,
    };

    const isLastRound = updatedParticipants[userIdx].roundsFinished === freshTournament.rounds;

    dispatch(setTournamentParticipants(updatedParticipants));
    const docRef = doc(db, TOURNAMENTS_DB, tournamentDocId);
    try {
      await updateDoc(docRef, {
        participants: updatedParticipants,
        winner: isLastRound ? updatedParticipants[userIdx] : null,
        status: isLastRound ? TOURNAMENT_STATUS.FINISHED : TOURNAMENT_STATUS.STARTED,
      });
    } catch (e) {
      console.error(e);
      throw new Error('Error on update doc');
    }

    if (isLastRound) {
      setWinnerDialogText({ title: 'You Won!', subtitle: 'Congratulations. Another round?' });
      dispatch(setTournamentWinner(updatedParticipants[userIdx]));
    } else {
      triggerGrid({ subject, difficulty });
    }
  }, [tournamentDocId, uid, dispatch, triggerGrid, subject, difficulty]);

  useEffect( () => {
    if (gameState === 'winner') handleRoundEnd();
  }, [gameState, handleRoundEnd]);

  return (
    <>
      { !!tournament?.winner && (
        <Particles init={particlesInit} options={confettiOptions} />
      )}
      <p className="text-xl mb-4">Round: {roundsFinished} of {tournament?.rounds}</p>
      <div className="grid grid-cols-5 gap-4">
        <WordList/>
        <Grid />
      </div>
      { !!tournament?.winner && <WinnerDialog
        title={winnerDialogText.title}
        subtitle={winnerDialogText.subtitle}
        btnText="create a tournament"
        onConfirm={goToCreateTournament}
      />}
    </>
  );
}

export default Game;
