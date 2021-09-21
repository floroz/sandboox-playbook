export type CellType = "text" | "code";

export type CellMoveDirection = "up" | "down";

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
