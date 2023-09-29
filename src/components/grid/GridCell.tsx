type GridCellProps = {
  letter: string;
  row: number;
  col: number;
};
export const GridCell = ({ letter }: GridCellProps) => {
  return (
    <div className="w-10 h-10 border border-gray-400 flex justify-center items-center">{ letter }</div>
  );
};
