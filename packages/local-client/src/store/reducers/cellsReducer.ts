import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell, CellMoveDirection, CellType } from "../cell";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

const defaultMarkdownContent = `# Header \n Hello World!`;

export interface CellState {
  data: {
    [key: Cell["id"]]: Cell;
  };
  loading: boolean;
  error: string | null;
  order: Cell["id"][];
}

const defaultState: CellState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

const swapCellOrder = (
  firstIndex: number,
  secondIndex: number,
  order: Cell["id"][]
): Cell["id"][] => {
  const temp = order[firstIndex];

  order[firstIndex] = order[secondIndex];
  order[secondIndex] = temp;

  return order;
};

const moveCell = (
  id: Cell["id"],
  direction: CellMoveDirection,
  state: CellState
): CellState => {
  let lastIndex = state.order.length - 1;
  let index = state.order.findIndex((item) => item === id);

  const indexToSwap = direction === "up" ? index - 1 : index + 1;

  const isOutOfBoundary =
    // we cannot move the last item forward
    // we cannot move the first time back and
    indexToSwap < 0 || indexToSwap > lastIndex;

  if (index === -1 || isOutOfBoundary) return state;

  state.order = swapCellOrder(index, indexToSwap, state.order);

  return state;
};

const deleteCell = (id: Cell["id"], state: CellState) => {
  delete state.data[id];

  state.order = state.order.filter((cellId) => cellId !== id);

  return state;
};

const updateCell = (
  id: Cell["id"],
  content: Cell["content"],
  state: CellState
) => {
  if (state.data[id]) state.data[id].content = content;

  return state;
};

const insertCellAfter = (
  id: Cell["id"] | null,
  type: CellType,
  state: CellState
) => {
  const cell: Cell = {
    type,
    content: type === "text" ? defaultMarkdownContent : "",
    id: uuidv4(),
  };

  state.data[cell.id] = cell;

  const index = state.order.findIndex((i) => i === id);

  if (index < 0) {
    state.order.unshift(cell.id);
  } else {
    state.order.splice(index + 1, 0, cell.id);
  }

  return state;
};

export const cellsReducer = produce(
  (state: CellState = defaultState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        return moveCell(action.payload.id, action.payload.direction, state);
      case ActionType.DELETE_CELL:
        return deleteCell(action.payload.id, state);
      case ActionType.INSERT_CELL_AFTER:
        return insertCellAfter(action.payload.id, action.payload.type, state);
      case ActionType.UPDATE_CELL:
        return updateCell(action.payload.id, action.payload.content, state);
      default:
        return state;
    }
  }
);
