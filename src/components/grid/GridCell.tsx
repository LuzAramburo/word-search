import { IGridItem } from '@/types/IGrid.ts';
import { useWordSearchContext, useWordSearchDispatch } from '@/context/WordSearchContext.tsx';

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
    dispatch({ type: 'setCollectedLetter', payload: item });
  };

  return (
    <div
      className="w-10 h-10 border border-gray-400 flex justify-center items-center select-none cursor-pointer"
      style={{ backgroundColor: item.color }}
      onMouseEnter={hoverHandler}
      onMouseDown={mouseDownHandler}
    >{ item.letter }</div>
  );
};
