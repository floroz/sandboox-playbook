import React, { useState } from "react";
import CodeEditor from "../code-editor/code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "../preview/preview";
import { useESBuild } from "../../hooks/useESBuild";
import debounce from "lodash/debounce";
import Resizable from "../resizable/resizable";
import "./code-cell.css";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type Props = { id: string };

const CodeCell: React.FC<Props> = ({ id }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { content } = useTypedSelector((state) => state.cells.data[id]);

  const { updateCell } = useAction();

  const { bundle } = useESBuild();

  const debouncedBundle = debounce(async (codeInput: string) => {
    const output = await bundle(codeInput);
    if (!output) return;

    setCode(output.code);
    setError(output.error);
  }, 1000);

  const onEditorChange = (userInput: string) => {
    updateCell(id, userInput);
    debouncedBundle(userInput);
  };

  return (
    <Resizable axis="y">
      <div className="code-cell">
        <Resizable axis="x">
          <CodeEditor onChange={onEditorChange} initialValue={content} />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
