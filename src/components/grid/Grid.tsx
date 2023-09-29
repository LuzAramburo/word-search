import { GridCell } from '@/components/grid/GridCell.tsx';

type GridProps = {
  wordsList: string[];
  matrix: null[][];
};

export const Grid = ({ wordsList, matrix }: GridProps) => {
  return (
    <div className="col-span-4">
      <div className="inline-grid grid-cols-12 gap-1">
        {matrix && matrix.map((row, rowIndex) => row.map((col, colIndex) => (
          <GridCell letter={'x'} row={rowIndex} col={colIndex} key={`cell(${rowIndex},${colIndex})`} />
        )) )}
      </div>
    </div>
  );
};
