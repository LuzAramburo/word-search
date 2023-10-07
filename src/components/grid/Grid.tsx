import { GridCell } from '@/components/grid/GridCell.tsx';
import { IGridItem } from '@/types/IGrid.ts';

type GridProps = {
  grid: IGridItem[];
};

export const Grid = ({ grid }: GridProps) => {
  return (
    <div className="col-span-4" >
      <div className="inline-grid grid-cols-12 gap-2.5">
        {grid && grid.map((item) =>  (
          <GridCell item={item} key={`P${item.position}-R${item.row}-C${item.col}`} />
        ))}
      </div>
    </div>
  );
};
