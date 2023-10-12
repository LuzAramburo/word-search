import { useWordSearchDispatch } from '@/context/WordSearchContext.tsx';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { GameDifficultyType } from '@/utils/WordSearchInitialValuesFactory.ts';

export const ConfigDialog = () => {
  const dispatch = useWordSearchDispatch();
  const [difficultySetting, setDifficultySetting] = useState<GameDifficultyType>('normal');
  const configDialogRef = useRef<HTMLDialogElement | null>(null);

  const [wordsTheme, setWordsTheme] = useState('random');

  const wordThemeChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setWordsTheme(e.target.value);
  };

  const difficultyList = ['easy', 'normal', 'hard'];
  const wordsThemes = [
    { id: 'random', label: 'Random' },
    { id:'adjectives', label: 'Adjectives' },
    { id: 'boardgames', label: 'Boardgames' },
    { id: 'computers', label: 'Computers' },
    { id: 'food', label: 'Food' },
    { id: 'space', label: 'Outer Space' }];

  useEffect(() => {
    dispatch({ type: 'setRef', payload: { name: 'configDialog', element: configDialogRef.current } });
  }, [configDialogRef, dispatch]);

  const changeDifficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficultySetting(e.target.value as GameDifficultyType);
  };

  const confirmHandler = () => {
    configDialogRef?.current?.close();
    dispatch({ type: 'changeDifficulty', payload: difficultySetting });
  };

  const cancelHandler = () => {
    configDialogRef?.current?.close();
  };

  return (
    <dialog ref={configDialogRef} id="configDialog" className="modal">
      <div className="modal-box">
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
          onChange={wordThemeChangeHandler}
          defaultValue={wordsTheme}
        >
          {wordsThemes.length > 0 && wordsThemes.map(item => (
            <option value={item.id} key={item.id}>{item.label}</option>
          ))}
        </select>
        <div className="mt-8 flex justify-end gap-3">
          <button className="btn btn-outline" onClick={cancelHandler}>Cancel</button>
          <button className="btn btn-primary" onClick={confirmHandler}>Confirm</button>
        </div>
      </div>
    </dialog>
  );
};
