import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { editor } from "monaco-editor";
import { useRef } from "react";
import "./code-editor.css";
import "./syntax.css";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

type CodeEditorProps = {
  initialValue?: string;
  onChange: (value: string) => void;
  isBundling: boolean;
};

const CodeEditor = ({
  initialValue,
  onChange,
  isBundling,
}: CodeEditorProps) => {
  const codeEditorRef = useRef<editor.IStandaloneCodeEditor>();

  const onEditorDidMount: EditorDidMount = (getEditorValue, monacoEditor) => {
    if (!codeEditorRef.current) {
      codeEditorRef.current = monacoEditor;
    }

    monacoEditor.onDidChangeModelContent(() => {
      const code = getEditorValue();
      onChange(code);
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-expect-error
      window.monaco,
      codeShift,
      monacoEditor
    );

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    const value = codeEditorRef.current?.getValue() ?? "";

    // format
    const formatted = prettier
      .format(value, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      //remove end of line from prettier
      .replace(/\n$/, "");

    codeEditorRef.current?.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      {isBundling && (
        <span className="icon spinner">
          <i className="fas fa-spinner"></i>
        </span>
      )}
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        height="100%"
        language="javascript"
        theme="dark"
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        value={initialValue}
        editorDidMount={onEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
