import { IGridItem } from '@/types/IGridMatrix.tsx';

type GridCellProps = {
  item: IGridItem;
};
export const GridCell = ({ item }: GridCellProps) => {
  return (
    <div className="w-10 h-10 border border-gray-400 flex justify-center items-center">{ item.letter }</div>
  );
};
