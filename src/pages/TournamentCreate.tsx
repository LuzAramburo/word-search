import { ChangeEvent, useState } from 'react';
import { DIFFICULTY_OPTIONS, SUBJECT_OPTIONS } from '@/utils/constants.ts';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';

export const TournamentCreate = () => {
  const [difficultySetting, setDifficultySetting] = useState<GameDifficultyType>('normal');
  const [rounds, setRounds] = useState(4);
  const [wordListSubject, setWordListSubject] = useState<WordListSubjects>('random');

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
    <div className="min-h-[70vh] mx-auto w-1/3 flex flex-col justify-center">
      <h2 className="text-xl font-bold">Create Tournament</h2>
      <form action="" className="max-w-xl">
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
          <button className="btn btn-secondary">Create</button>
        </div>
      </form>
    </div>
  );
};
