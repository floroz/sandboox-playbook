import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const html = `
    <html>
<head>
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

const App: React.FC = () => {
  const [code, setCode] = useState("");
  const esbuildRef = useRef<esbuild.Service | undefined>();
  const iframeRef = useRef<any>();

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });

    return service;
  };

  const onEditorChange = (code: string) => {
    setCode(code);
  };

  const onSubmit = async () => {
    if (!esbuildRef.current) {
      return;
    }

    iframeRef.current.srcdoc = html;

    const content = await esbuildRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(code)],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
      },
    });

    iframeRef.current.contentWindow.postMessage(
      content.outputFiles[0].text,
      "*"
    );
  };

  useEffect(() => {
    startService().then((service) => {
      esbuildRef.current = service;
    });
  }, []);

  return (
    <div>
      <CodeEditor onChange={onEditorChange} />
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
        title="js sandbox"
        name="js-sandbox"
      ></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
