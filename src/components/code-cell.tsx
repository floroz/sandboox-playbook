import React, { useState } from "react";
import CodeEditor from "./code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "./preview";
import { useESBuild } from "../hooks/bundler/useESBuild";
import debounce from "lodash/debounce";
import Resizable from "./resizable";
import "./code-cell.css";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState("");

  const [isResizing, setIsResizing] = useState(false);

  const { bundle } = useESBuild();

  const debouncedBuildCode = debounce(async (codeInput: string) => {
    const builtCode = await bundle(codeInput);
    if (!builtCode) return;

    setCode(builtCode);
  }, 1500);

  const onEditorChange = (userInput: string) => {
    debouncedBuildCode(userInput);
  };

  const onResizeStart = () => {
    if (isResizing) return;
    setIsResizing(true);
  };
  const onResizeStop = () => {
    if (!isResizing) return;
    setIsResizing(false);
  };

  return (
    <Resizable
      axis="y"
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    >
      <div className="code-cell">
        <CodeEditor onChange={onEditorChange} />
        <Preview code={code} isResizing={isResizing} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
