import { Cell } from "../../store/cell";
import CodeCell from "../code-cell/code-cell";
import TextEditor from "../text-editor/text-editor";

type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  if (cell.type === "code") {
    return <CodeCell id={cell.id} />;
  }

  if (cell.type === "text") {
    return <TextEditor id={cell.id} />;
  }

  return null;
};

export default CellListItem;
