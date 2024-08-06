import { GridCell } from '@/features/grid/GridCell.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { primaryInput } from 'detect-it';
import { clearSelection, stopCollecting } from '@/store/gameSlice.ts';

export const Grid = () => {
  const { size, grid } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  const handleClearSelection = () => {
    dispatch(stopCollecting());
    dispatch(clearSelection());
  };

  return (
    <div className="md:col-span-4">
      {primaryInput === 'touch' && (<div className="w-full mb-4">
        <button className="btn btn-sm" onClick={handleClearSelection}>Clear selection</button>
      </div>)}
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
