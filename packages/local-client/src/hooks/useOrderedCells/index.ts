import { Cell } from "../../store/cell";
import { useTypedSelector } from "../useTypedSelector";

export const useOrderedCells = (): Cell[] => {
  return useTypedSelector(({ cells: { data, order } }) =>
    order.map((id) => data[id])
  );
};
