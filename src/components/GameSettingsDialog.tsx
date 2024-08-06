import { ChangeEvent, useEffect, useState } from 'react';
import { GameDifficultyType } from '@/utils/GameStateFactory.ts';
import { Dialog } from '@/components/Dialog.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { showDialog } from '@/store/gameSlice.ts';
import { DIFFICULTY_OPTIONS, SUBJECT_OPTIONS } from '@/utils/constants.ts';
import { gridApi } from '@/store/gridApi.ts';
import { WordListSubjects } from '@/utils/word-list-builder.ts';

export const GameSettingsDialog = () => {
  const [triggerGrid] = gridApi.endpoints.generateGrid.useLazyQuery();
  const { gameSettingsDialog, subject, difficulty } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  const [difficultySetting, setDifficultySetting] = useState<GameDifficultyType>('normal');
  const [wordListSubject, setWordListSubject] = useState<WordListSubjects>('random');

  useEffect(() => {
    setDifficultySetting(difficulty);
    setWordListSubject(subject);
  }, [difficulty, subject]);

  const wordSubjectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setWordListSubject(e.target.value as WordListSubjects);
  };


  const changeDifficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficultySetting(e.target.value as GameDifficultyType);
  };

  const confirmHandler = () => {
    triggerGrid({ difficulty: difficultySetting, subject: wordListSubject });
  };

  const cancelHandler = () => {
    dispatch(showDialog({ name: 'gameSettingsDialog', show: false }));
  };

  return (
    <Dialog open={gameSettingsDialog} escKeyHandler={cancelHandler}>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={cancelHandler}>✕</button>
      </form>
      <h1 className="font-bold text-2xl">Game Settings</h1>
      <h4 className="py-4 font-bold text-sm uppercase">Game Difficulty</h4>
      <div className="join">
        {DIFFICULTY_OPTIONS.map((item) => (
          <input
            className="join-item btn"
            type="radio"
            name="gameDifficulty"
            aria-label={item}
            defaultChecked={difficulty === item}
            key={item + 'radio'}
            value={item}
            onChange={(e) => changeDifficultyHandler(e)}
          />
        ))}
      </div>
      <h4 className="py-4 font-bold text-sm uppercase mt-3">Word List Theme</h4>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={wordSubjectChangeHandler}
        defaultValue={subject}
      >
        {SUBJECT_OPTIONS.map(item => (
          <option value={item.id} key={item.id}>{item.label}</option>
        ))}
      </select>
      <div className="mt-8 flex justify-end gap-3">
        <button className="btn btn-outline" onClick={cancelHandler}>Cancel</button>
        <button className="btn btn-primary" onClick={confirmHandler}>Confirm</button>
      </div>
    </Dialog>
  );
};
