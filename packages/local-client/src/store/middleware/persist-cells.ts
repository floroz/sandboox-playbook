import { saveCells } from "..";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import debounce from "lodash/debounce";

const debouncedSave = debounce(
  (dispatch, getState) => saveCells()(dispatch, getState),
  500
);

export const persistCells = (store: any) => {
  return (next: (action: Action) => {}) => {
    return (action: Action) => {
      switch (action.type) {
        case ActionType.MOVE_CELL:
        case ActionType.DELETE_CELL:
        case ActionType.INSERT_CELL_AFTER:
          saveCells()(store.dispatch, store.getState);
          return next(action);
        case ActionType.UPDATE_CELL:
          debouncedSave(store.dispatch, store.getState);
          return next(action);
        default:
          return next(action);
      }
    };
  };
};
