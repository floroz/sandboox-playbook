import { useOrderedCells } from "../../hooks/useOrderedCells";
import CellListItem from "../cell-list-item/cell-list-item";

interface Props {}

const CellList = (props: Props) => {
  const cells = useOrderedCells();

  return (
    <ul>
      {cells.map((cell) => (
        <CellListItem cell={cell} key={cell.id} />
      ))}
    </ul>
  );
};

export default CellList;
