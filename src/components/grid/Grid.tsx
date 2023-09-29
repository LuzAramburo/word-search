import { GridCell } from '@/components/grid/GridCell.tsx';
import { IGridMatrix } from '@/types/IGridMatrix.tsx';

type GridProps = {
  wordsList: string[];
  matrix: IGridMatrix;
};

export const Grid = ({ wordsList, matrix }: GridProps) => {
  return (
    <div className="col-span-4">
      <div className="inline-grid grid-cols-12 gap-1">
        {matrix && matrix.map((item) =>  (
          <GridCell item={item} key={`cell(${item.position},${item.row},${item.col})`} />
        ))}
      </div>
    </div>
  );
};
