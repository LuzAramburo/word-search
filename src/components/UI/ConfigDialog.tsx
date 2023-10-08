import { useWordSearchDispatch } from '@/context/WordSearchContext.tsx';
import { ChangeEvent, useState } from 'react';
import { GameDifficultyType } from '@/utils/WordSearchInitialValuesFactory.ts';

export const ConfigDialog = () => {
  const dispatch = useWordSearchDispatch();
  const [difficultySetting, setDifficultySetting] = useState<GameDifficultyType>('normal');

  const difficultyList = ['easy', 'normal', 'hard'];

  const changeDifficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficultySetting(e.target.value as GameDifficultyType);
  };

  const confirmHandler = () => {
    document.getElementById('configDialog').close();
    dispatch({ type: 'changeDifficulty', payload: difficultySetting });
  };

  const cancelHandler = () => {
    document.getElementById('configDialog').close();
  };

  return (
    <>
      <dialog id="configDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
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
          <div className="mt-8 flex justify-end gap-3">
            <button className="btn btn-outline" onClick={cancelHandler}>Cancel</button>
            <button className="btn btn-primary" onClick={confirmHandler}>Confirm</button>
          </div>
        </div>
      </dialog>
    </>
  );
};
