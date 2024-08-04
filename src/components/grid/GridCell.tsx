import { IGridItem } from '@/types/IGrid.ts';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setCollectedLetter } from '@/store/gameSlice.ts';
import { primaryInput } from 'detect-it';

type GridCellProps = {
  item: IGridItem;
};

export const GridCell = ({ item }: GridCellProps) => {
  const dispatch = useAppDispatch();
  const { gameState } = useAppSelector(state => state.game);

  const hoverHandler = () => {
    if (gameState === 'collecting') dispatch(setCollectedLetter(item));
  };

  const collectLetter = () => {
    if (!item.collected || item.collected && gameState !== 'winner') {
      dispatch(setCollectedLetter(item));
    }
  };

  const mouseDownHandler = () => {
    if (primaryInput === 'mouse') {
      collectLetter();
    }
  };

  const onTouchStartHandler = () => {
    if (primaryInput === 'touch') {
      collectLetter();
    }
  };

  return (
    <div
      className={classNames(
        'w-7 h-7 sm:w-10 sm:h-10 flex justify-center items-center select-none cursor-pointer ',
        'transition-colors border border-gray-400',
        { 'hover:bg-base-200 text-base-content': !item.collected && !item.used },
        { 'bg-primary-content text-primary': item.collected },
        { 'text-accent-content bg-accent': item.used && !item.collected },
        { 'opacity-40': import.meta.env.VITE_DEBUG_GRID && item.letter === 'x' },
      )}
      onMouseEnter={hoverHandler}
      onMouseDown={mouseDownHandler}
      onTouchStart={onTouchStartHandler}
    >{ item.letter }</div>
  );
};
