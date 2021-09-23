import { useAction } from "../../hooks/useAction";
import "./add-cell.css";

interface Props {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell = ({ nextCellId, forceVisible }: Props) => {
  const { insertBeforeCell } = useAction();

  return (
    <div className={`add-cell ${forceVisible ? "force-visible" : ""}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBeforeCell(nextCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fa fa-plus"></i>
          </span>{" "}
          <span>Text</span>
        </button>
      </div>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBeforeCell(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fa fa-plus"></i>
          </span>{" "}
          <span>Code</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
