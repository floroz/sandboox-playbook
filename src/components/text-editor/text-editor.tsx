import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useRef, useState } from "react";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./text-editor.css";

interface Props {
  id: string;
}

const TextEditor = ({ id }: Props) => {
  const [editing, setEditing] = useState(false);
  const MDEditorRef = useRef<HTMLDivElement>(null);

  const { content } = useTypedSelector((state) => state.cells.data[id]);

  const onPreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setEditing(true);
  };
  const { updateCell } = useAction();

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

  const onEditorChange = (event: string | undefined) => {
    updateCell(id, event ?? "");
  };

  if (editing) {
    return (
      <div ref={MDEditorRef} className="text-editor">
        <MDEditor onChange={onEditorChange} value={content} />
      </div>
    );
  }

  return (
    <div onClick={onPreviewClick} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={content} />
      </div>
    </div>
  );
};

export default TextEditor;
