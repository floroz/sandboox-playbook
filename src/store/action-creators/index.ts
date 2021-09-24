import { Dispatch } from "redux";
import bundle from "../../bundler";
import { ActionType } from "../action-types";
import {
  Action,
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { Cell, CellMoveDirection, CellType } from "../cell";

export const moveCell = (
  id: Cell["id"],
  direction: CellMoveDirection
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      direction,
      id,
    },
  };
};

export const deleteCell = (id: Cell["id"]): DeleteCellAction => ({
  type: ActionType.DELETE_CELL,
  payload: {
    id,
  },
});

export const updateCell = (
  id: Cell["id"],
  content: Cell["content"]
): UpdateCellAction => ({
  type: ActionType.UPDATE_CELL,
  payload: {
    id,
    content,
  },
});

export const insertCellAfter = (
  id: string | null,
  type: CellType
): InsertCellAfterAction => ({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id,
    type,
  },
});

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
