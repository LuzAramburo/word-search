import { IGridItem } from '@/types/IGrid.tsx';

type GridCellProps = {
  item: IGridItem;
};
export const GridCell = ({ item }: GridCellProps) => {
  const hoverHandler = (e) => {
    console.log(e);
  };
  // TODO: on click, is collecting. if is collecting and mouseenter, collect it. idle or answering on click release
  return (
    <div
      className="w-10 h-10 border border-gray-400 flex justify-center items-center"
      style={{ background: item.color }}
      onClick={e => hoverHandler(e)}
    >{ item.letter }</div>
  );
};
