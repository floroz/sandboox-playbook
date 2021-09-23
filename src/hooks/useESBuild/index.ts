import * as esbuild from "esbuild-wasm";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPlugin } from "./plugins/fetch-plugin";
import debounce from "lodash/debounce";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";

export const useESBuild = (content: string) => {
  const esbuildRef = useRef<esbuild.Service | undefined>();

  const [code, setCode] = useState<string>("");
  const [error, setError] = useState("");

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });

    return service;
  };

  const bundle = useMemo(
    () =>
      debounce(async (code: string) => {
        if (!esbuildRef.current) {
          return;
        }

        try {
          const output = await esbuildRef.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(code)],
            define: {
              "process.env.NODE_ENV": "'production'",
              global: "window",
            },
          });

          setCode(output.outputFiles[0].text);
          setError("");
        } catch (error) {
          setCode("");
          setError((error as any).message as string);
        }
      }, 1000),
    []
  );

  useEffect(() => {
    startService().then((service) => {
      esbuildRef.current = service;
    });
  }, []);

  useEffect(() => {
    bundle(content);
  }, [bundle, content]);

  return { code, error };
};
