import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { editor } from "monaco-editor";
import { useRef } from "react";

const defaultInitialValue = `const message = 'Hello World!'\n\nconsole.log(message)`;

type CodeEditorProps = {
  initialValue?: string;
  onChange: (value: string) => void;
};

const CodeEditor = ({
  initialValue = defaultInitialValue,
  onChange,
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
  };

  const onFormatClick = () => {
    const value = codeEditorRef.current?.getValue() ?? "";

    // format
    const formatted = prettier.format(value, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    codeEditorRef.current?.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        height={400}
        width={400}
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
