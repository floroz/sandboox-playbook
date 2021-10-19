import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistCells } from "./middleware/persist-cells";
import { rootReducer } from "./reducers";

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk, persistCells)
);
