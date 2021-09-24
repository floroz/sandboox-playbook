import React, { useEffect } from "react";
import CodeEditor from "../code-editor/code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "../preview/preview";
import Resizable from "../resizable/resizable";
import "./code-cell.css";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Cell } from "../../store/cell";

type Props = { cell: Cell };

const CodeCell: React.FC<Props> = ({ cell }) => {
  const { updateCell, createBundle } = useAction();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode = [
      `
        const show = (value) => {
          document.querySelector('#root').innerHTML = value;
        };
      `,
    ];
    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join("\n"));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join("\n"), cell.id, createBundle]);

  const onEditorChange = (userInput: string) => {
    updateCell(cell.id, userInput);
  };

  return (
    <Resizable axis="y">
      <div className="code-cell">
        <Resizable axis="x">
          <CodeEditor
            onChange={onEditorChange}
            isBundling={!!bundle?.loading}
            initialValue={cell.content}
          />
        </Resizable>
        <Preview code={bundle?.code ?? ""} error={bundle?.err ?? ""} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
