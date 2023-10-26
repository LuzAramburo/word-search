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
import { clearTournament, restartGame, setTournamentParticipants, setTournamentWinner } from '@/store/gameSlice.ts';
import { ITournament } from '@/types/ITournament.ts';
import { TOURNAMENTS_DB } from '@/utils/globals.ts';
import { useNavigate } from 'react-router-dom';

function Game() {
  const { gameState, tournament, winnerDialog }= useAppSelector(state => state.game);
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
    navigate('tournament/create');
  };

  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  // TODO update tournament round when completed
  // TODO check if the round matches the limit round of the tournament

  // TODO watch if there a winner


  useEffect(() => {
    if (!tournament) return;
    return onSnapshot(doc(db, TOURNAMENTS_DB, tournament.docId), (doc) => {
      const tournamentInDB = doc.data() as ITournament;

      // TODO notify other player won
      console.log('Doc updated', tournamentInDB);
      if (tournamentInDB.winner && tournamentInDB.winner.uid !== user?.uid) {
        console.log(`${tournamentInDB.winner.displayName} Won!`);
        setWinnerDialogText({ title: `${tournamentInDB.winner.displayName} Won!`, subtitle: 'Another round?' });
        dispatch(setTournamentWinner(tournamentInDB.winner));
      }

      //  TODO notify when other participants complete round.
      //   idea: if not you is different to local, notify and update local
    });
  }, []);

  useEffect( () => {
    if (gameState === 'winner' && tournament && user) {
      // dispatch(checkTournament(user as IUser));
      const userParticipantIndex = tournament.participants.findIndex(participant => participant.uid === user?.uid);
      let userCompletedAllRounds = false;

      const updateTournament = async () => {
        const updatedParticipants = [...tournament.participants];
        updatedParticipants[userParticipantIndex] = {
          ...updatedParticipants[userParticipantIndex],
          roundsFinished: updatedParticipants[userParticipantIndex].roundsFinished + 1,
        };

        setRoundsFinished(prev => prev + 1);
        if (roundsFinished === tournament.rounds) userCompletedAllRounds = true;

        dispatch(setTournamentParticipants(updatedParticipants)); // TODO do i need this? there should be a watcher
        const docRef = doc(db, TOURNAMENTS_DB, tournament.docId);
        try {
          await updateDoc(docRef, {
            participants: updatedParticipants,
            winner: userCompletedAllRounds ? updatedParticipants[userParticipantIndex] : null,
          });
        } catch (e) {
          console.log('Error on update doc');
        }

        if (userCompletedAllRounds) {
          console.log('USER WON');
          setWinnerDialogText({ title: 'You Won!', subtitle: 'Congratulations' });
        } else {
          dispatch(restartGame());
        }
      };

      updateTournament();
    }
  }, [gameState]);

  if (gameState === 'loading') return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span className="loading loading-bars loading-lg" />
    </div>
  );

  return (
    <>
      { winnerDialog && (
        <Particles init={particlesInit} options={confettiOptions} />
      )}
      <p className="text-xl mb-4">Round: {roundsFinished} of {tournament?.rounds}</p>
      <div className="grid grid-cols-5 gap-4">
        <WordList/>
        <Grid />
      </div>
      { winnerDialog && <WinnerDialog
        title={winnerDialogText.title}
        subtitle={winnerDialogText.subtitle}
        onConfirm={goToCreateTournament}
      />}
    </>
  );
}

export default Game;
