import { IGridItem } from '@/types/IGrid.ts';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setCollectedLetter } from '@/store/gameSlice.ts';

type GridCellProps = {
  item: IGridItem;
};

export const GridCell = ({ item }: GridCellProps) => {
  const dispatch = useAppDispatch();
  const { gameState } = useAppSelector(state => state.game);

  const hoverHandler = () => {
    if (gameState === 'collecting') dispatch(setCollectedLetter(item));
  };

  const mouseDownHandler = () => {
    if (!item.collected || item.collected && gameState !== 'winner') {
      dispatch(setCollectedLetter(item));
    }
  };

  return (
    <div
      className={classNames(
        'w-10 h-10 flex justify-center items-center select-none cursor-pointer ',
        'transition-colors border border-gray-400',
        { 'hover:bg-base-200 text-base-content': !item.collected && !item.used },
        { 'bg-primary-content text-primary': item.collected },
        { 'text-accent-content bg-accent': item.used && !item.collected },
      )}
      onMouseEnter={hoverHandler}
      onMouseDown={mouseDownHandler}
    >{ item.letter }</div>
  );
};
