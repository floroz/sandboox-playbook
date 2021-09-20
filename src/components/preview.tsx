import { useEffect, useRef } from "react";
import "./preview.css";

interface Props {
  code: string;
  error: string;
}

const Preview = ({ code, error }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.srcdoc = html;
  }, []);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow!.postMessage(code, "*");
  }, [code]);

  console.log("error!", error);

  return (
    <div className="preview-wrapper">
      <iframe
        className="iframe"
        srcDoc={html}
        ref={iframeRef}
        sandbox="allow-scripts"
        title="js_sandbox"
      />
      {error && (
        <div className="preview-error">
          <p>{error}</p>
        </div>
      )}
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
      const handleError = (error) => {
        rootElement.innerHTML = '<div style="color: red;"> <h4>Runtime Error</h4>' + error + '</div>';
          console.error(error);
      }

      window.addEventListener("message", ({ data }) => {
        try {
          rootElement.innerHTML = "";
          eval(data);
        } catch (error) {
          handleError(error)
        }
      }, false);

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error)
      })
    </script>
  </body>
</html>
  `;
