import { Cell } from "../../store/cell";
import { useTypedSelector } from "../useTypedSelector";

/**
 * This is the function to have show in scope for all the cell bundles, that will be replaced by a working version only for the cell that nedds to display the bundle
 */
const showFnNoop = `
  var show = () => {};
`;

const showFn = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';

  var show = (value) => {
    const root = document.querySelector('#root');
    if (typeof value === 'object' && value.$$typeof && value.props) {
      _ReactDOM.render(value,  root);
    } else if (typeof value === 'object') {
      root.innerHTML = JSON.stringify(value);
    } else {
      root.innerHTML = value;
    }
  };
      `;
/**
 * Bundles and accumulate all the previous cells' code, and provide scoping of React, ReactDOM and the `show` function.
 * @param cellId - cell id
 * @returns the cumulative code bundled to display in the preview
 */
export const useCumulativeCode = (cellId: Cell["id"]): string => {
  const cumulative = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode = [showFnNoop];

    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        /**
         * If we reached the cell that will need to display the bundle,
         * we insert a valid version of the show function that will execute
         * code to display on the preview
         */
        cumulativeCode.splice(cumulativeCode.length - 2, 1, showFn);
        break;
      }
    }
    return cumulativeCode;
  });

  return cumulative.join("\n");
};
