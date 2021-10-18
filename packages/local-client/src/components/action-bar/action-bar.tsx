import { useAction } from "../../hooks/useAction";
import "./action-bar.css";

interface Props {
  id: string;
}

const ActionBar = ({ id }: Props) => {
  const { moveCell, deleteCell } = useAction();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "down")}
      >
        {" "}
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="button  is-small" onClick={() => deleteCell(id)}>
        {" "}
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;