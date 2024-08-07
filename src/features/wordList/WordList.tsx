import classNames from 'classnames';
import { useAppSelector } from '@/store/hooks.ts';

export const WordList = () => {
  const wordsList = useAppSelector(state => state.game.wordList);
  return (
    <ul className="md:col-span-1 border border-gray-400 px-4 py-2 sm:p-4 grid grid-cols-2 md:flex flex-col md:gap-3 md:order-first">
      { wordsList.length > 0 && wordsList.map((item, index) => (
        <li
          className={classNames('text-lg sm:text-xl uppercase decoration-[3px]', { 'line-through': item.found })}
          key={index}
        >{item.word}</li>
      )) }
    </ul>
  );
};
