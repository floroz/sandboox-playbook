import { combineReducers } from "redux";
import { cellsReducer } from "./cellsReducer";
import { bundlesReducer } from "./bundleReducer";

export const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
