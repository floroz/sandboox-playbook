import * as esbuild from "esbuild-wasm";
import { useCallback, useEffect, useRef } from "react";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";

export const useESBuild = () => {
  const esbuildRef = useRef<esbuild.Service | undefined>();

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });

    return service;
  };

  const bundle = useCallback(async (code: string) => {
    if (!esbuildRef.current) {
      return;
    }
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

    return content.outputFiles[0].text;
  }, []);

  useEffect(() => {
    startService().then((service) => {
      esbuildRef.current = service;
    });
  }, []);

  return { bundle };
};
