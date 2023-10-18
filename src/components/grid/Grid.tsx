import { GridCell } from '@/components/grid/GridCell.tsx';
import { useAppSelector } from '@/store/hooks.ts';

export const Grid = () => {
  const { size, grid } = useAppSelector(state => state.game);
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
