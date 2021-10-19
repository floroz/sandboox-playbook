import { useAction } from "../../hooks/useAction";
import "./add-cell.css";

interface Props {
  previousCell: string | null;
  forceVisible?: boolean;
}

const AddCell = ({ previousCell, forceVisible }: Props) => {
  const { insertCellAfter } = useAction();

  return (
    <div className={`add-cell ${forceVisible ? "force-visible" : ""}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCell, "text")}
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
          onClick={() => insertCellAfter(previousCell, "code")}
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
