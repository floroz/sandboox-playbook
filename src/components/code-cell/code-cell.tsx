import React, { useState } from "react";
import CodeEditor from "../code-editor/code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "../preview/preview";
import { useESBuild } from "../../hooks/useESBuild";
import Resizable from "../resizable/resizable";
import "./code-cell.css";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type Props = { id: string };

const CodeCell: React.FC<Props> = ({ id }) => {
  const { content } = useTypedSelector((state) => state.cells.data[id]);

  const { code, error, loading: isBundling } = useESBuild(content);

  const { updateCell } = useAction();

  const onEditorChange = (userInput: string) => {
    updateCell(id, userInput);
  };

  console.log(code);

  return (
    <Resizable axis="y">
      <div className="code-cell">
        <Resizable axis="x">
          <CodeEditor
            onChange={onEditorChange}
            initialValue={content}
            isBundling={isBundling}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
