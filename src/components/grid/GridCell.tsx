import { IGridItem } from '@/types/IGrid.ts';
import { useWordSearchContext, useWordSearchDispatch } from '@/context/WordSearchContext.tsx';
import classNames from 'classnames';

type GridCellProps = {
  item: IGridItem;
};
export const GridCell = ({ item }: GridCellProps) => {
  const dispatch = useWordSearchDispatch();
  const { gameState } = useWordSearchContext();

  const hoverHandler = () => {
    if (gameState === 'collecting') dispatch({ type: 'setCollectedLetter', payload: item });
  };

  const mouseDownHandler = () => {
    if (!item.collected || item.collected && gameState !== 'winner')
      dispatch({ type: 'setCollectedLetter', payload: item });
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
