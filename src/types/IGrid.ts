export interface IGridItem {
  letter: string;
  position: number;
  row: number;
  col: number;
  // orientation: string;
  collected: boolean;
  used: boolean;
}
