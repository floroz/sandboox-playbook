import { ActionType } from "../action-types";
import { Cell, CellType, CellMoveDirection } from "../cell";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: CellMoveDirection;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: Cell["content"];
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionType.FETCH_CELLS_START;
}
export interface FetchCellsErrorAction {
  type: ActionType.FETCH_CELLS_ERROR;
  payload: { error: string };
}
export interface FetchCellsSuccessAction {
  type: ActionType.FETCH_CELLS_SUCCESS;
  payload: { data: { [key: Cell["id"]]: Cell }; order: Cell["id"][] };
}

export interface SaveCellsAction {
  type: ActionType.SAVE_CELLS;
}
export interface SaveCellsErrorAction {
  type: ActionType.SAVE_CELLS_ERROR;
  payload: {
    error: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsSuccessAction
  | FetchCellsErrorAction
  | SaveCellsAction
  | SaveCellsErrorAction;
