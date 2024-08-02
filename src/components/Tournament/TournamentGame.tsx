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
  const [roundsFinished, setRoundsFinished] = useState(1);

  const navigate = useNavigate();

  const goToCreateTournament = () => {
    dispatch(clearTournament());
    navigate('/tournament/create');
  };

  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  useEffect(() => {
    if (!tournament) return;

    return onSnapshot(doc(db, TOURNAMENTS_DB, tournament.docId), (doc) => {
      const tournamentInDB = doc.data() as ITournament;
      if (tournamentInDB.winner && tournamentInDB.winner.uid !== user?.uid) {
        setWinnerDialogText({ title: `${tournamentInDB.winner.displayName} Won!`, subtitle: 'Another round?' });
        dispatch(setTournamentWinner(tournamentInDB.winner));
      }
    });
  }, []);

  const updateTournament = useCallback(async () => {
    if (!tournament) return;
    const userParticipantIndex = tournament.participants.findIndex(participant => participant.uid === user?.uid);
    let userCompletedAllRounds = false;

    const updatedParticipants = [...tournament.participants];
    updatedParticipants[userParticipantIndex] = {
      ...updatedParticipants[userParticipantIndex],
      roundsFinished: updatedParticipants[userParticipantIndex].roundsFinished + 1,
    };

    setRoundsFinished(prev => prev + 1);
    if (roundsFinished === tournament.rounds) userCompletedAllRounds = true;

    dispatch(setTournamentParticipants(updatedParticipants));
    const docRef = doc(db, TOURNAMENTS_DB, tournament.docId);
    try {
      await updateDoc(docRef, {
        participants: updatedParticipants,
        winner: userCompletedAllRounds ? updatedParticipants[userParticipantIndex] : null,
        status: userCompletedAllRounds ? TOURNAMENT_STATUS.FINISHED : TOURNAMENT_STATUS.STARTED,
      });
    } catch (e) {
      console.error(e);
      throw new Error('Error on update doc');
    }

    if (userCompletedAllRounds) {
      setWinnerDialogText({ title: 'You Won!', subtitle: 'Congratulations. Another round?' });
      dispatch(setTournamentWinner(updatedParticipants[userParticipantIndex]));
    } else {
      triggerGrid({ subject, difficulty });
    }
  }, []);

  useEffect( () => {
    if (gameState === 'winner') updateTournament();
  }, [gameState, updateTournament]);

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
