import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { db } from '@/firebase.ts';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { changeSettings, setTournament } from '@/store/gameSlice.ts';
import { IParticipant, ITournament } from '@/types/ITournament.ts';
import { addToast } from '@/store/notificationsSlice.ts';

const TournamentLanding = () => {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [tournamentIdInput, setTournamentIdInput] = useState('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value.toUpperCase();
    setTournamentIdInput(id);
  };

  const joinTournament = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tournamentIdInput !== '' && user) {
      // TODO handle id not found, empty input and errors
      const q = query(collection(db, 'tournaments'), where('code', '==', tournamentIdInput));
      try {
        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty) {
          dispatch(addToast({
            type: 'error',
            content: 'Tournament Not Found',
          }));
        }
        querySnapshot.forEach((doc) => {
          const tournament = doc.data() as ITournament;
          if (tournament.started) {
            dispatch(addToast({
              type: 'error',
              content: 'This tournament has already started',
            }));
            return;
          }

          const newParticipant: IParticipant = {
            uid: user.uid,
            displayName: user.displayName,
            avatar: user.avatar,
            roundsFinished: 0,
          };
          tournament.docId = doc.id;
          tournament.participants = [...tournament.participants, newParticipant];
          updateDoc(doc.ref, {
            participants: tournament.participants,
          });
          dispatch(changeSettings({
            difficulty: tournament.difficulty,
            subject: tournament.subject,
          }));
          dispatch(setTournament(tournament));
          navigate(`/tournament/${tournamentIdInput}`);
        });
      } catch (e) {
        console.error(e);
        throw new Error('Error getting Tournament');
      }
    }

  };

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-xl mb-2">Join Tournament</h2>
      {/* TODO to uppercase */}
      <form onSubmit={e => joinTournament(e)}>
        <div className="join">
          <input
            value={tournamentIdInput}
            type="text"
            placeholder="Tournament ID"
            className="input input-md input-bordered w-full max-w-xs join-item"
            onChange={e => inputHandler(e)}
          />
          <button className="btn btn-primary rounded-r-full join-item">Join</button>
        </div>
        <div className="divider w-2/4 mx-auto">OR</div>
      </form>
      <Link to="/tournament/create" className="btn btn-primary">Create a Tournament</Link>
    </div>
  );
};
export default TournamentLanding;
