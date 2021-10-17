import { useOrderedCells } from "../../hooks/useOrderedCells";
import CellListItem from "../cell-list-item/cell-list-item";
import AddCell from "../add-cell/add-cell";
import React from "react";
import "./cell-list.css";

interface Props {}

const CellList = (props: Props) => {
  const cells = useOrderedCells();

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCell={cell.id} />
    </React.Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell previousCell={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
