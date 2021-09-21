import React from "react";
import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
// import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App: React.FC = () => {
  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
      <div style={{ width: "100%", height: 500 }} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
