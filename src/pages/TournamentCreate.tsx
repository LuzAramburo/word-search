import { ChangeEvent, FormEvent, useState } from 'react';
import { DIFFICULTY_OPTIONS, SUBJECT_OPTIONS } from '@/utils/constants.ts';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { useNavigate } from 'react-router-dom';
import { db } from '@/firebase.ts';
import { collection, addDoc } from 'firebase/firestore';
import generateUniqueId from 'generate-unique-id';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setTournament } from '@/store/gameSlice.ts';
import { IParticipant } from '@/types/ITournament.ts';
import { addToast } from '@/store/notificationsSlice.ts';
import { gridApi } from '@/store/gridApi.ts';
import { WordListSubjects } from '@/utils/word-list-builder.ts';

const TournamentCreate = () => {
  const [triggerGrid] = gridApi.endpoints.generateGrid.useLazyQuery();
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loadingGame, setLoadingGame] = useState(false);

  const [difficultySetting, setDifficultySetting] = useState<GameDifficultyType>('normal');
  const [rounds, setRounds] = useState(4);
  const [wordListSubject, setWordListSubject] = useState<WordListSubjects>('random');
  const [displayName, setDisplayName] = useState('');

  const createTournament = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingGame(true);
    if (!user) return;
    try {
      const code = generateUniqueId({
        length: 6,
        excludeSymbols: ['0', 'o', '1', 'l'],
      }).toUpperCase();

      const firstParticipant: IParticipant = {
        uid: user?.uid,
        displayName: user?.displayName ? user?.displayName : displayName,
        avatar: user?.avatar,
        roundsFinished: 0,
      };
      if (user?.avatar) firstParticipant.avatar = user?.avatar;

      const tournamentSettings = {
        code: code,
        participants: [firstParticipant],
        rounds: rounds,
        status: 'CREATED',
        userOwner: user.uid,
        winner: null,
        difficulty: difficultySetting,
        subject: wordListSubject,
      };
      const docRef = await addDoc(collection(db, 'tournaments'), tournamentSettings);

      triggerGrid({ difficulty: difficultySetting, subject: wordListSubject });

      dispatch(setTournament({
        ...tournamentSettings,
        status: 'CREATED',
        docId: docRef.id,
      }));

      navigate(`/tournament/${code}`);
    } catch (e) {
      setLoadingGame(false);
      dispatch(addToast({
        type: 'error',
        content: 'The tournament could not be created, please try again.',
      }));
      console.error('Error adding document: ', e);
    }
  };

  const changeRoundsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRounds(Number(e.target.value));
  };

  const changeDifficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficultySetting(e.target.value as GameDifficultyType);
  };

  const wordSubjectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setWordListSubject(e.target.value as WordListSubjects);
  };

  return (
    <div className="min-h-[70vh] mx-auto md:w-2/5 flex flex-col justify-center">
      <h2 className="text-xl font-bold">Create Tournament</h2>
      <form onSubmit={e => createTournament(e)} className="max-w-xl">
        {!user?.displayName && <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Display Name</span>
          </label>
          <input
            type="text"
            value={displayName}
            className="input input-bordered w-full"
            onChange={e => setDisplayName(e.target.value)}
            required
          />
        </div>}
        <div className="flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Difficulty</span>
            </label>
            <div className="join">
              {DIFFICULTY_OPTIONS.map((item) => (
                <input
                  className="join-item btn"
                  type="radio"
                  name="gameDifficulty"
                  aria-label={item}
                  checked={difficultySetting === item}
                  key={item + 'radio'}
                  value={item}
                  onChange={(e) => changeDifficultyHandler(e)}
                />
              ))}
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Rounds to complete</span>
            </label>
            <input
              type="number"
              value={rounds}
              className="input input-bordered w-full"
              onChange={changeRoundsHandler}
              max={25}
              min={1}
              required
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Subject</span>
          </label>
          <select
            className="select select-bordered w-full"
            onChange={wordSubjectChangeHandler}
            defaultValue={wordListSubject}
          >
            {SUBJECT_OPTIONS.map(item => (
              <option value={item.id} key={item.id}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full mt-4">
          <button className="btn btn-secondary">
            {loadingGame && <span className="loading loading-spinner"/>}
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default TournamentCreate;
