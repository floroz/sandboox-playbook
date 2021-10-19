import { useOrderedCells } from "../../hooks/useOrderedCells";
import CellListItem from "../cell-list-item/cell-list-item";
import AddCell from "../add-cell/add-cell";
import React, { useEffect } from "react";
import "./cell-list.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useAction";

interface Props {}

const CellList = (props: Props) => {
  const { fetchCells, saveCells } = useAction();

  useEffect(() => {
    fetchCells();
  }, []);

  const { data, order } = useTypedSelector((state) => state.cells);

  useEffect(() => {
    saveCells();
  }, [data, order]);

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
