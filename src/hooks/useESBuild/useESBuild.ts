import { useCallback, useEffect, useRef } from "react";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";
import * as esbuild from "esbuild-wasm";

export const useESBuild = () => {
  const esbuildRef = useRef<esbuild.Service | undefined>();

  /**
   * Start and stop the ESBuild service
   */
  useEffect(() => {
    const startService = async () => {
      const service = await esbuild.startService({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
      });

      return service;
    };

    startService().then((service) => {
      esbuildRef.current = service;
    });

    return () => {
      esbuildRef.current?.stop();
      esbuildRef.current = undefined;
    };
  }, []);

  const build = useCallback(async (code: string) => {
    if (!esbuildRef.current) {
      return;
    }
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

    return output;
  }, []);

  return { build };
};
