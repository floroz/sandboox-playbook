import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { cellsReducer, CellState } from "./cellsReducer";

const initialState: CellState = {
  data: {},
  error: null,
  loading: false,
  order: [],
};
describe("cellReducer", () => {
  test("should insert a cell", () => {
    const action: Action = {
      type: ActionType.INSERT_CELL_AFTER,
      payload: { id: null, type: "code" },
    };
    const { order } = cellsReducer(initialState, action);

    expect(order.length).toBe(1);
    expect(typeof order[0]).toBe("string");
  });

  test("should insert a cell in the right place", () => {
    const cell: Cell = {
      id: "123",
      type: "text",
      content: "hello world",
    };

    const state: CellState = {
      ...initialState,
      data: {
        [cell.id]: cell,
      },
      order: [cell.id],
    };

    const action: Action = {
      type: ActionType.INSERT_CELL_AFTER,
      payload: { id: cell.id, type: "code" },
    };

    const { order, data } = cellsReducer(state, action);

    expect(order).toHaveLength(2);

    expect(order[0]).not.toBe(cell.id);

    expect(Object.keys(data)).toHaveLength(2);
  });

  describe("when dispatching move actions", () => {
    const cell1: Cell = {
      id: "123",
      type: "text",
      content: "",
    };

    const cell2: Cell = {
      id: "312",
      type: "text",
      content: "",
    };

    const state: CellState = {
      ...initialState,
      data: {
        [cell1.id]: cell1,
        [cell2.id]: cell2,
      },
      order: [cell1.id, cell2.id],
    };
    test("should move a cell down,", () => {
      const action: Action = {
        type: ActionType.MOVE_CELL,
        payload: { id: cell1.id, direction: "down" },
      };
      const { order } = cellsReducer(state, action);

      expect(order[0]).toBe(cell2.id);
      expect(order[1]).toBe(cell1.id);
    });

    test("should move a cell up,", () => {
      const action: Action = {
        type: ActionType.MOVE_CELL,
        payload: { id: cell2.id, direction: "up" },
      };
      const { order } = cellsReducer(state, action);

      expect(order[0]).toBe(cell2.id);
      expect(order[1]).toBe(cell1.id);
    });
  });

  describe("when dispatched deleting actions", () => {
    const cell1: Cell = {
      id: "123",
      type: "text",
      content: "",
    };

    const state: CellState = {
      ...initialState,
      data: {
        [cell1.id]: cell1,
      },
      order: [cell1.id],
    };

    test("should delete a cell,", () => {
      const action: Action = {
        type: ActionType.DELETE_CELL,
        payload: { id: cell1.id },
      };
      const { order } = cellsReducer(state, action);

      expect(order).toHaveLength(0);
    });

    test("should not delete a cell for invalid id", () => {
      const action: Action = {
        type: ActionType.DELETE_CELL,
        payload: { id: "something-else" },
      };
      const { order } = cellsReducer(state, action);

      expect(order).toHaveLength(1);
    });
  });

  test("should update a cell", () => {
    const cell1: Cell = {
      id: "123",
      type: "text",
      content: "",
    };

    const state: CellState = {
      ...initialState,
      data: {
        [cell1.id]: cell1,
      },
      order: [cell1.id],
    };

    const updateContent = "hello world";

    const action: Action = {
      type: ActionType.UPDATE_CELL,
      payload: { id: cell1.id, content: updateContent },
    };

    const { data } = cellsReducer(state, action);

    expect(data[cell1.id].content).toBe(updateContent);
  });
});
