import { useEffect, useRef } from "react";
import "./preview.css";

interface Props {
  code: string;
}

const Preview = ({ code }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.srcdoc = html;
  }, []);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow!.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        className="iframe"
        srcDoc={html}
        ref={iframeRef}
        sandbox="allow-scripts"
        title="js_sandbox"
      />
    </div>
  );
};

export default Preview;

const html = `
<html>
  <head>
    <style>
    html {
      background-color: white;
    }
    </style>
  </head>
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
