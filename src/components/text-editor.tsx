import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useRef, useState } from "react";
import "./text-editor.css";

const defaultText = `
  # Header
  
  paragraph

  ## List

  1. item one
  2. item two
`;

interface Props {}

const TextEditor = (props: Props) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const MDEditorRef = useRef<HTMLDivElement>(null);

  const onPreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setEditing(true);
  };

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.target &&
        !MDEditorRef.current?.contains(event.target as Node)
      ) {
        setEditing(false);
      }
    };

    document.addEventListener("click", onDocumentClick, { capture: true });

    return () => {
      document.removeEventListener("click", onDocumentClick, {
        capture: true,
      });
    };
  }, []);

  if (editing) {
    return (
      <div ref={MDEditorRef} className="text-editor">
        <MDEditor onChange={(e) => setText(e ?? "")} value={text} />
      </div>
    );
  }

  return (
    <div onClick={onPreviewClick} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={text} />
      </div>
    </div>
  );
};

export default TextEditor;
