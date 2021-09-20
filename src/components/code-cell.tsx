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
  const [error, setError] = useState("");

  const { bundle } = useESBuild();

  const debouncedBundle = debounce(async (codeInput: string) => {
    const output = await bundle(codeInput);
    if (!output) return;

    setCode(output.code);
    setError(output.error);
  }, 1000);

  const onEditorChange = (userInput: string) => {
    debouncedBundle(userInput);
  };

  return (
    <Resizable axis="y">
      <div className="code-cell">
        <Resizable axis="x">
          <CodeEditor onChange={onEditorChange} />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
