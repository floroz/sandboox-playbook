import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell, CellMoveDirection } from "../cell";
import produce from "immer";

interface CellState {
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

const moveCell = (
  id: Cell["id"],
  direction: CellMoveDirection,
  state: CellState
) => {
  let lastIndex = state.order.length - 1;
  let currentIndex = state.order.findIndex((item) => item === id);

  if (direction === "down") {
    if (currentIndex === lastIndex) {
      // item is already last, cannot be moved further
      return state;
    }

    let nextId = state.order[currentIndex + 1];

    state.order[currentIndex] = nextId;
    state.order[currentIndex + 1] = id;
  } else {
    if (currentIndex === 0) {
      // item is already first, cannot be moved before
      return state;
    }

    let previousId = state.order[currentIndex - 1];

    state.order[currentIndex] = previousId;
    state.order[currentIndex - 1] = id;
  }

  return state;
};

const deleteCell = (id: Cell["id"], state: CellState) => {
  delete state.data[id];

  const orderIndex = state.order.findIndex((cellId) => cellId === id);

  state.order.slice(orderIndex, 1);

  return state;
};

const updateCell = (
  id: Cell["id"],
  content: Cell["content"],
  state: CellState
) => {
  if (!state.data[id]) {
    return state;
  }

  state.data[id].content = content;

  return state;
};

export const cellsReducer = produce(
  (state: CellState = defaultState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        return moveCell(action.payload.id, action.payload.direction, state);
      case ActionType.DELETE_CELL:
        return deleteCell(action.payload.id, state);
      case ActionType.INSERT_CELL_BEFORE:
        return state;
      case ActionType.UPDATE_CELL:
        return updateCell(action.payload.id, action.payload.content, state);
      default:
        return state;
    }
  }
);
