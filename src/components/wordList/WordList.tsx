import classNames from 'classnames';
import { useAppSelector } from '@/store/hooks.ts';

export const WordList = () => {
  const wordsList = useAppSelector(state => state.game.wordList);
  return (
    <ul className="md:col-span-1 border border-gray-400 p-4 grid grid-cols-2 md:grid-cols-1 md:order-first">
      { wordsList.length > 0 && wordsList.map((item, index) => (
        <li
          className={classNames('text-xl mb-3 uppercase decoration-[3px]', { 'line-through': item.found })}
          key={index}
        >{item.word}</li>
      )) }
    </ul>
  );
};
