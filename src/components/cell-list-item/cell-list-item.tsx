import { Cell } from "../../store/cell";
import ActionBar from "../action-bar/action-bar";
import CodeCell from "../code-cell/code-cell";
import TextEditor from "../text-editor/text-editor";
import "./cell-list-item.css";

type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  let child: JSX.Element | null = null;

  if (cell.type === "code") {
    child = <CodeCell id={cell.id} />;
  } else if (cell.type === "text") {
    child = <TextEditor id={cell.id} />;
  }

  return (
    <div className="cell-list-item">
      <ActionBar id={cell.id} />
      {child}
    </div>
  );
};

export default CellListItem;
