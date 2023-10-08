import { GridCell } from '@/components/grid/GridCell.tsx';
import { useWordSearchContext } from '@/context/WordSearchContext.tsx';

export const Grid = () => {
  const { size, grid } = useWordSearchContext();
  return (
    <div className="col-span-4" >
      <div
        className="inline-grid gap-2.5"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {grid && grid.map((item) =>  (
          <GridCell item={item} key={`P${item.position}-R${item.row}-C${item.col}`} />
        ))}
      </div>
    </div>
  );
};
