import { useEffect, useRef } from "react";
import "./preview.css";

interface Props {
  code: string;
  isResizing: boolean;
}

const Preview = ({ code, isResizing }: Props) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;

    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className={`iframe-wrapper ${isResizing ? "is-iframe-resizing" : ""}`}>
      <div className="iframe-backdrop" />
      <iframe
        className="iframe"
        srcDoc={html}
        ref={iframeRef}
        sandbox="allow-scripts"
        title="js_sandbox"
        width={300}
      />
    </div>
  );
};

export default Preview;

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const rootElement = document.getElementById('root');

      window.addEventListener("message", ({ data }) => {
      try {
        rootElement.innerHTML = "";
        eval(data);
      } catch (error) {

        rootElement.innerHTML = '<div style="color: red;"> <h4>Runtime Error</h4>' + error + '</div>';
        console.error(error);

      }
      }, false);
    </script>
  </body>
</html>
  `;
