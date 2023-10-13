import { useWordSearchContext, useWordSearchDispatch } from '@/context/WordSearchContext.tsx';
import { ChangeEvent, useState } from 'react';
import { GameDifficultyType } from '@/utils/WordSearchContextFactory.ts';
import { WordListSubjects } from '@/utils/WordListFactory.tsx';
import { Dialog } from '@/components/UI/Dialog.tsx';

export const GameSettingsDialog = () => {
  const { gameSettingsDialog } = useWordSearchContext();
  const dispatch = useWordSearchDispatch();
  const [difficultySetting, setDifficultySetting] = useState<GameDifficultyType>('normal');

  const [wordListSubject, setWordListSubject] = useState<WordListSubjects>('random');

  const wordSubjectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setWordListSubject(e.target.value as WordListSubjects);
  };

  const difficultyList = ['easy', 'normal', 'hard'];
  const selectSubjectOptions: { id: WordListSubjects, label: string }[] = [
    { id: 'random', label: 'Random' },
    { id: 'adjectives', label: 'Adjectives' },
    { id: 'boardgames', label: 'Boardgames' },
    { id: 'computers', label: 'Computers' },
    { id: 'food', label: 'Food' },
    { id: 'space', label: 'Outer Space' },
  ];


  const changeDifficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficultySetting(e.target.value as GameDifficultyType);
  };

  const confirmHandler = () => {
    dispatch({ type: 'changeSettings', payload: { difficulty: difficultySetting, subject: wordListSubject } });
  };

  const cancelHandler = () => {
    dispatch({ type: 'showDialog', payload: { name: 'gameSettingsDialog', show: false } });
  };

  return (
    <Dialog open={gameSettingsDialog}>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h1 className="font-bold text-2xl">Game Settings</h1>
      <h4 className="py-4 font-bold text-sm uppercase text-base-content/70">Game Difficulty</h4>
      <div className="join">
        {difficultyList.length > 0 && difficultyList.map((item) => (
          <input
            className="join-item btn"
            type="radio"
            name="gameDifficulty"
            aria-label={item}
            checked={difficultySetting === item}
            key={item}
            value={item}
            onChange={(e) => changeDifficultyHandler(e)}
          />
        ))}
      </div>
      <h4 className="py-4 font-bold text-sm uppercase text-base-content/70 mt-3">Word List Theme</h4>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={wordSubjectChangeHandler}
        defaultValue={wordListSubject}
      >
        {selectSubjectOptions.length > 0 && selectSubjectOptions.map(item => (
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
